"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

export const UpgradeView = () => {
  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-10">
      <div className="mt-4 flex-1 flex flex-col gap-y-10 items-center justify-center">
        <h5 className="font-medium text-2xl md:text-3xl">
          <span className="font-semibold text-primary">
            Premium Subscription
          </span>
        </h5>
        <p className="text-muted-foreground text-center max-w-md">
          Subscription management is currently disabled. 
          All users have unlimited access to the app features.
        </p>
      </div>
    </div>
  );
};

export const UpgradeViewLoading = () => {
  return (
    <LoadingState title="Loading" description="This may take a few seconds" />
  );
};

export const UpgradeViewError = () => {
  return <ErrorState title="Error" description="Please try again later" />;
};
