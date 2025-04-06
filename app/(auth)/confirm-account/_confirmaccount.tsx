"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { verifyEmailMutationFn } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmAccount() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code") as string;

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!code) {
      toast({
        title: "Error",
        description: "Invalid or expired reset link",
        variant: "destructive",
      });
      router.replace("/forgot-password");
      return;
    }
    const data = {
      code: code,
    };
    mutate(data, {
      onSuccess: (res) => {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "default",
        });
        router.replace("/");
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };
  return (
    <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center ">
      <div className="w-full h-full p-5 rounded-md">
        <Logo />

        <h1
          className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-4 mt-8
        text-center sm:text-left"
        >
          Account confirmation
        </h1>
        <p className="mb-6 text-center sm:text-left text-[15px] dark:text-[#f1f7feb5] font-normal">
          To confirm your account, please follow the button below.
        </p>
        <form>
          <Button
            disabled={isPending}
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-700 text-[15px] h-[40px] text-white font-semibold"
          >
            Confirm account
            {isPending && <Loader className="animate-spin" />}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
          If you have any issue confirming your account please, contact{" "}
          <a
            className="outline-none transition duration-150 ease-in-out 
            focus-visible:ring-2 text-primary hover:underline focus-visible:ring-primary"
            href="#"
          >
            support@gemtunde.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
