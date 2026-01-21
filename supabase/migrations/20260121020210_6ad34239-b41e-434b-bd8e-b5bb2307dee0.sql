-- 1) Anonymize IP addresses before they are stored in page_views
CREATE OR REPLACE FUNCTION public.anonymize_ip(ip text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  parts text[];
BEGIN
  IF ip IS NULL OR ip = '' THEN
    RETURN ip;
  END IF;

  -- IPv4: mask the last octet (e.g., 203.0.113.42 -> 203.0.113.0)
  IF position('.' in ip) > 0 THEN
    parts := string_to_array(ip, '.');
    IF array_length(parts, 1) = 4 THEN
      parts[4] := '0';
      RETURN array_to_string(parts, '.');
    END IF;
  END IF;

  -- IPv6: mask the last hextet (best-effort)
  IF position(':' in ip) > 0 THEN
    parts := string_to_array(ip, ':');
    IF array_length(parts, 1) >= 2 THEN
      parts[array_length(parts, 1)] := '0000';
      RETURN array_to_string(parts, ':');
    END IF;
  END IF;

  -- Fallback: if unknown format, return NULL to avoid storing raw identifiers
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.trg_page_views_anonymize_ip()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.ip_address := public.anonymize_ip(NEW.ip_address);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS page_views_anonymize_ip ON public.page_views;
CREATE TRIGGER page_views_anonymize_ip
BEFORE INSERT OR UPDATE OF ip_address ON public.page_views
FOR EACH ROW
EXECUTE FUNCTION public.trg_page_views_anonymize_ip();


-- 2) Reduce spoofing risk by removing session_id-based public access for chat tables
--    (AIChat currently does not persist conversations/messages to DB; it calls the ai-chat function directly.)
DROP POLICY IF EXISTS "Users can view own session conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can create chat conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can view messages in own conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can insert chat messages" ON public.chat_messages;

-- Lock down chat tables to admins only (read/manage)
CREATE POLICY "Admins can manage chat conversations"
ON public.chat_conversations
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can manage chat messages"
ON public.chat_messages
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
