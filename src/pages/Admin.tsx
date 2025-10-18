import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, Mail, Download, Users } from "lucide-react";
import { useContactSubmissions, useNewsletterSubscribers, usePageViews, useAnalyticsStats } from "@/hooks/useAdminData";
import { StatsCard } from "@/components/admin/StatsCard";
import { DataTable, formatDate } from "@/components/admin/DataTable";
import { ExportButton } from "@/components/admin/ExportButton";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { SearchBar } from "@/components/admin/SearchBar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useAnalyticsCharts } from "@/hooks/useAnalyticsCharts";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: contacts, isLoading: contactsLoading } = useContactSubmissions();
  const { data: subscribers, isLoading: subscribersLoading } = useNewsletterSubscribers();
  const { data: pageViews, isLoading: pageViewsLoading } = usePageViews();
  const { data: stats } = useAnalyticsStats();
  const { pageViewsByDay, topPages, contactsByType } = useAnalyticsCharts();

  const [contactSearch, setContactSearch] = useState("");
  const [subscriberSearch, setSubscriberSearch] = useState("");

  // Filter contacts by search
  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
    if (!contactSearch) return contacts;
    
    const search = contactSearch.toLowerCase();
    return contacts.filter(contact => 
      contact.name?.toLowerCase().includes(search) ||
      contact.email?.toLowerCase().includes(search) ||
      contact.company?.toLowerCase().includes(search)
    );
  }, [contacts, contactSearch]);

  // Filter subscribers by search
  const filteredSubscribers = useMemo(() => {
    if (!subscribers) return [];
    if (!subscriberSearch) return subscribers;
    
    const search = subscriberSearch.toLowerCase();
    return subscribers.filter(sub => 
      sub.name?.toLowerCase().includes(search) ||
      sub.email?.toLowerCase().includes(search)
    );
  }, [subscribers, subscriberSearch]);

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        await checkAdminStatus(session.user.id);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        await checkAdminStatus(session.user.id);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .single();

      if (error && error.code !== "PGRST116") throw error;
      setIsAdmin(!!data);
    } catch (error) {
      console.error("Admin check failed:", error);
      setIsAdmin(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Signed in successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign out",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Sign in to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSigningIn}>
                {isSigningIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have admin privileges</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSignOut} variant="outline" className="w-full">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Page Views"
                value={stats?.totalPageViews || 0}
                icon={Eye}
                description="Lifetime page views"
              />
              <StatsCard
                title="Contact Submissions"
                value={stats?.totalContacts || 0}
                icon={Mail}
                description="Total inquiries received"
              />
              <StatsCard
                title="Resume Downloads"
                value={stats?.totalDownloads || 0}
                icon={Download}
                description="Total CV downloads"
              />
              <StatsCard
                title="Newsletter Subscribers"
                value={stats?.totalSubscribers || 0}
                icon={Users}
                description="Active subscribers"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnalyticsChart 
                data={pageViewsByDay || []}
                type="bar"
                title="Page Views This Week"
                dataKey="value"
                nameKey="name"
              />
              <AnalyticsChart 
                data={topPages || []}
                type="pie"
                title="Top Pages"
                dataKey="value"
                nameKey="name"
              />
              <AnalyticsChart 
                data={contactsByType || []}
                type="pie"
                title="Inquiries by Type"
                dataKey="value"
                nameKey="name"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Welcome to Admin Dashboard</CardTitle>
                <CardDescription>
                  Manage your portfolio content, view submissions, and analyze site performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use the tabs above to navigate through different sections of the admin panel.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Contact Submissions</CardTitle>
                    <CardDescription>View and manage contact form submissions</CardDescription>
                  </div>
                  <ExportButton 
                    data={contacts || []} 
                    filename="contact-submissions"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <SearchBar 
                  value={contactSearch}
                  onChange={setContactSearch}
                  placeholder="Search contacts by name, email, or company..."
                />
                <DataTable
                  data={filteredContacts}
                  isLoading={contactsLoading}
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    { key: "company", label: "Company" },
                    { key: "project_type", label: "Project Type" },
                    { 
                      key: "message", 
                      label: "Message",
                      render: (value) => (
                        <div className="max-w-xs truncate">{value}</div>
                      )
                    },
                    { 
                      key: "created_at", 
                      label: "Date",
                      render: (value) => formatDate(value)
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Newsletter Subscribers</CardTitle>
                    <CardDescription>Manage your newsletter subscriber list</CardDescription>
                  </div>
                  <ExportButton 
                    data={subscribers || []} 
                    filename="newsletter-subscribers"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <SearchBar 
                  value={subscriberSearch}
                  onChange={setSubscriberSearch}
                  placeholder="Search subscribers by name or email..."
                />
                <DataTable
                  data={filteredSubscribers}
                  isLoading={subscribersLoading}
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    { 
                      key: "status", 
                      label: "Status",
                      render: (value) => <StatusBadge status={value || "active"} />
                    },
                    { 
                      key: "subscribed_at", 
                      label: "Subscribed",
                      render: (value) => formatDate(value)
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Page Views</CardTitle>
                    <CardDescription>Latest 100 page views across your site</CardDescription>
                  </div>
                  <ExportButton 
                    data={pageViews || []} 
                    filename="page-views"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={pageViews || []}
                  isLoading={pageViewsLoading}
                  columns={[
                    { key: "page_path", label: "Page" },
                    { key: "referrer", label: "Referrer" },
                    { 
                      key: "user_agent", 
                      label: "Device",
                      render: (value) => (
                        <div className="max-w-xs truncate text-xs">{value}</div>
                      )
                    },
                    { 
                      key: "created_at", 
                      label: "Timestamp",
                      render: (value) => formatDate(value)
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
