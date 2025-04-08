import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { revokeMFAMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useCallback } from "react";

const RevokeMfa = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: revokeMFAMutationFn,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      toast({
        title: "Success",
        description: res.data.message,
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

  const handleRevoke = useCallback(() => {
    mutate();
  }, []);
  return (
    <Button
      onClick={handleRevoke}
      disabled={isPending}
      className="h-[35px] !text-[#c40006d3] !bg-red-100 shadow-none mr-1"
    >
      Revoke Access
      {isPending && <Loader className="animate-spin " />}
    </Button>
  );
};

export default RevokeMfa;
