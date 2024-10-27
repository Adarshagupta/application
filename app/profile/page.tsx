"use client";

import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl p-4 space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Profile</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your account settings
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="mt-1">{session?.user?.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium">Account created</label>
              <p className="mt-1">
                {session?.user?.createdAt
                  ? new Date(session.user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button
              variant="destructive"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
