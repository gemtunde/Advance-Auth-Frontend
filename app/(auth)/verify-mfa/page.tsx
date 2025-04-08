import React, { Suspense } from "react";
import VerifyMfa from "./_verifymfa";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyMfa />
    </Suspense>
  );
};

export default Page;
