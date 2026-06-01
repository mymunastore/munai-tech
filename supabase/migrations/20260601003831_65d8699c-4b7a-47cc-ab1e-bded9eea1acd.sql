-- Ensure RLS is enabled on realtime.messages (it is by default, but be explicit)
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

-- Drop any existing permissive policies we previously created (idempotent)
DROP POLICY IF EXISTS "Admins can subscribe to realtime" ON realtime.messages;
DROP POLICY IF EXISTS "Admins can broadcast realtime" ON realtime.messages;

-- Only admins may receive realtime messages (subscribe to channels)
CREATE POLICY "Admins can subscribe to realtime"
ON realtime.messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Only admins may send realtime broadcast/presence messages
CREATE POLICY "Admins can broadcast realtime"
ON realtime.messages
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
