"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div suppressHydrationWarning className="fixed top-0 bg-transparent backdrop-blur w-full h-[calc(100vh-56px)] flex items-center justify-center">
      <div className="text-white md:w-3/5 md:h-3/5 w-full h-full p-4 border-border border bg-[#0074d0]/80 backdrop-blur md:rounded-xl flex flex-col shadow-xl">
        <div className="flex flex-col">
          <span className="text-6xl font-mono mb-8">:&#40;</span>
          <h1 className="text-xl font-semibold font-mono mb-4">
            Your page ran into a problem and couldn&apos;t be displayed.
          </h1>
          <p className="text-white/90 font-mono text-sm">
            If you&apos;re seeing this screen, the page you&apos;re looking for
            might have been moved, deleted, or never existed.
          </p>
          <p className="text-white/70 font-mono text-sm mt-4">
            Please check the URL and try again.
            <br />
            <br />
            For more information, search online later for this error:
            <br />
            <span className="text-white">HTTP_404_PAGE_NOT_FOUND</span>
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            <ChevronLeft className={'-mt-[1px]'}/> Back
          </Button>
          <Button
            variant="default"
            onClick={() => router.refresh()}
          >
            <RotateCw className={'-mt-[1px]'}/> Reload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
