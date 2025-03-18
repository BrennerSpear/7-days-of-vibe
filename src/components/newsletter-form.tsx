import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const createSubscriberMutation = api.subscriber.create.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      setFirstName("");
      setEmail("");
      setIsSubmitting(false);
    },
    onError: (error) => {
      setError(error.message);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    if (!firstName.trim() || !email.trim()) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    createSubscriberMutation.mutate({ firstName, email });
  };

  return (
    <Card className="max-w-xl mx-auto bg-white/50 dark:bg-gray-800/50">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Subscribe for Updates</h3>
        </div>
        
        {isSuccess ? (
          <div className="text-center p-4 bg-green-100 dark:bg-green-900 rounded-md mb-4">
            <p className="text-green-800 dark:text-green-200">
              Thanks for subscribing! We&apos;ll keep you updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                required
              />
            </div>
            
            <div>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full py-2 bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
            
            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center mt-2">
                {error}
              </p>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  );
}