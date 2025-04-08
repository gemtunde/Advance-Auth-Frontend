"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import Logo from "@/components/logo";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { verifyMFALoginMutationFn } from "@/lib/api";

const VerifyMfa = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyMFALoginMutationFn,
    onSuccess: (res) => {
      router.replace("/home");
      toast({
        title: "Success",
        description: res?.data?.message,
        variant: "default",
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is required",
        variant: "destructive",
      });
      router.replace("/");
      return;
    }
    const payload = {
      email,
      code: values.pin,
    };
    mutate(payload);
  };
  return (
    <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center ">
      <div className="w-full h-full p-5 rounded-md">
        <Logo />

        <h1
          className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mt-8
        text-center sm:text-left"
        >
          Multi-Factor Authentication
        </h1>
        <p className="mb-6 text-center sm:text-left text-[15px] dark:text-[#f1f7feb5] font-normal">
          Enter the code from your authenticator app.
        </p>

        <div className="mt-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mt-6 flex flex-col gap-4 "
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm mb-1 font-normal">
                      One-time code
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        className="!text-lg flex items-center"
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        {...field}
                        style={{ justifyContent: "center" }}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="!w-14 !h-12 !text-lg"
                          />
                          <InputOTPSlot
                            index={1}
                            className="!w-14 !h-12 !text-lg"
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={2}
                            className="!w-14 !h-12 !text-lg"
                          />
                          <InputOTPSlot
                            index={3}
                            className="!w-14 !h-12 !text-lg"
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={4}
                            className="!w-14 !h-12 !text-lg"
                          />
                          <InputOTPSlot
                            index={5}
                            className="!w-14 !h-12 !text-lg"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                className="w-full bg-blue-700 text-white hover:bg-blue-900 h-[40px] mt-2"
              >
                Continue
                {isPending && <Loader className="animate-spin ml-2" />}
                <ArrowRight />
              </Button>
            </form>
          </Form>
        </div>

        <Button
          variant="ghost"
          className="w-full bg-blue-500 text-white hover:bg-blue-700 hover:text-white text-[15px] mt-2 h-[40px]"
        >
          Return to sign in
        </Button>
      </div>
    </main>
  );
};

export default VerifyMfa;
