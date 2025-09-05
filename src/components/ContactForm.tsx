import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import type { Locale } from "@/i18n/config";
import { useSendEmail } from "@/hooks/useSendEmail";
import { Loading } from "./ui/loading";
import { Message } from "./ui/message";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Message is required").max(5000),
});

export type SendEmailFormValues = z.infer<typeof schema>;

interface ContactFormProps {
  locale: Locale;
  emailApiAccessKey: string;
}

export const ContactForm = ({
  locale,
  emailApiAccessKey,
}: ContactFormProps) => {
  const form = useForm<SendEmailFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const { t, isLoading, error } = useTranslation(locale, ["common", "ui"]);
  const { sendEmail, status, message, reset } = useSendEmail();

  const onSubmit = async (values: SendEmailFormValues) => {
    await sendEmail(values, emailApiAccessKey);
    toast("Message sent");
    reset();
    form.reset();
  };

  if (error) {
    return <Message title={error.message} type="error" />;
  }

  if (isLoading || !t) {
    return <Loading />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        aria-live="polite"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.name")}</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.email")}</FormLabel>
              <FormControl>
                <Input placeholder="john_doe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.message")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={status === "loading"} type="submit">
          {t("buttons.submit")}
        </Button>

        {message && (
          <Message
            type={status === "error" ? "error" : "default"}
            title={message}
            icon={
              status === "success" ? (
                <CheckCircle2Icon />
              ) : status === "error" ? (
                <AlertCircleIcon />
              ) : undefined
            }
          />
        )}
      </form>
    </Form>
  );
};
