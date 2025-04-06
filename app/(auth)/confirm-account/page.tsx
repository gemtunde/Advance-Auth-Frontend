import React, { Suspense } from "react";
import ConfirmAccount from "./_confirmaccount";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmAccount />
    </Suspense>
  );
};

export default Page;
