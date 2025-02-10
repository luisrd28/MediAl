"use client";

import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import {Card, CardHeader, CardBody} from "@heroui/card";
import {Chip} from "@heroui/chip";
import {Divider} from "@heroui/divider";

export default function AlgorithmsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Back Button */}
      <div className="mb-4">
        <Link href="/">
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
              Back
            </span>
          </ShimmerButton>
        </Link>
      </div>

      {/* Grid container for cards */}
      <div className="grid grid-cols-1 gap-4 justify-items-start">
        {/* Clickable Card */}
        <Link href="/algorithms/hepatitis-b">
          <Card className="w-[90%] md:w-[400px] cursor-pointer">
            {/* Card Header */}
            <CardHeader>
              <h2 className="text-lg font-bold">
                Hepatitis B Serology Interpreter
              </h2>
            </CardHeader>
            <Divider />
            {/* Card Body */}
            <CardBody className="relative">
              <p>
                Determines Hepatitis B stage based on serologic markers.
              </p>
              {/* Chip positioned at the lower right within the card body */}
              <div className="mt-4 flex justify-end">
                <Chip
                  className="rounded"
                  style={{ backgroundColor: "#52b788", color: "black" }}
                >
                  Infectious Disease
                </Chip>
              </div>
            </CardBody>
          </Card>
        </Link>
      </div>
    </div>
  );
}
