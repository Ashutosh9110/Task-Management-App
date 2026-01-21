
import { useState } from "react";

export const PricingTable = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="relative font-inter antialiased">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        {/* Feature Comparison Pricing Table component */}
        <div className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-4 md:-mx-6 text-sm">
          {/* Column with labels */}
          <section className="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl">
            {/* Pricing toggle */}
            <div className="relative bg-white/5 px-6 flex flex-col justify-end">
              <div className="pb-5 md:border-b border-white/10">
                {/* Toggle switch */}
                <div className="max-md:text-center">
                  <div className="inline-flex items-center whitespace-nowrap">
                    <div className="text-sm text-gray-400 mr-2 md:max-lg:sr-only">Monthly</div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="toggle"
                        className="peer sr-only"
                        checked={isAnnual}
                        onChange={() => setIsAnnual(!isAnnual)}
                      />
                      <label
                        htmlFor="toggle"
                        className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-600 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-150 peer-checked:bg-indigo-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-indigo-500"
                      >
                        <span className="sr-only">Pay Yearly</span>
                      </label>
                    </div>
                    <div className="text-sm text-gray-400 ml-2">
                      Yearly <span className="text-emerald-500">(-20%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* # Platform */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-1"
              aria-hidden="true"
            >
              <div className="py-2 text-white font-medium mt-4">Platform</div>
            </div>
            {/* Account Access */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-2"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">Account Access</div>
            </div>
            {/* Custom Domains */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-3"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">Custom Domains</div>
            </div>
            {/* Receipts Forward */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-4"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">Receipts Forward</div>
            </div>
            {/* Supplier Management */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-5"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">
                Supplier Management
              </div>
            </div>
            {/* # Features */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-6"
              aria-hidden="true"
            >
              <div className="py-2 text-white font-medium mt-4">Features</div>
            </div>
            {/* Generate Public URLs */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-7"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">
                Generate Public URLs
              </div>
            </div>
            {/* API Integrations */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-8"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">API Integrations</div>
            </div>
            {/* Extra Add-ons */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-9"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">Extra Add-ons</div>
            </div>
            {/* Admin Roles */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-10"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">Admin Roles</div>
            </div>
            {/* Admin Roles */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-11"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">Admin Roles</div>
            </div>
            {/* Enterprise Add-ons */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-12"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">
                Enterprise Add-ons
              </div>
            </div>
            {/* # Support */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-[13]"
              aria-hidden="true"
            >
              <div className="py-2 text-white font-medium mt-4">Support</div>
            </div>
            {/* Custom Connection */}
            <div
              className="bg-white/5 px-6 flex flex-col justify-end max-md:hidden md:order-[14]"
              aria-hidden="true"
            >
              <div className="py-2 text-gray-400 border-b border-white/10">Custom Connection</div>
            </div>
          </section>
          {/* End: Column with labels */}

          {/* Essential table */}
          <section className="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl">
            <div className="relative bg-white/5 px-4 lg:px-6 flex flex-col justify-end">
              <div className="grow mb-5">
                <div className="font-semibold text-white mb-0.5">Essential</div>
                <div className="mb-1">
                  <span className="text-xl font-medium text-white">$</span>
                  <span className="text-3xl font-bold text-white">
                    {isAnnual ? "29" : "35"}
                  </span>
                  <span className="text-gray-500 font-medium">/mo</span>
                </div>
                <div className="text-sm text-gray-500">Unlimited placeholder texts.</div>
              </div>
              <div className="pb-4 border-b border-white/10">
                <a
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 group"
                  href="#0"
                >
                  Get Started{" "}
                  <span className="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    -&gt;
                  </span>
                </a>
              </div>
            </div>
            {/* # Platform */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-1">
              <div className="py-2 text-white font-medium mt-4 md:sr-only">Platform</div>
            </div>
            {/* Account Access */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-2">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  400 <span className="md:sr-only">Account Access</span>
                </span>
              </div>
            </div>
            {/* Custom Domains */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-3">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  4 <span className="md:sr-only">Custom Domains</span>
                </span>
              </div>
            </div>
            {/* Receipts Forward */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-4">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  Unlimited <span className="md:sr-only">Receipts Forward</span>
                </span>
              </div>
            </div>
            {/* Supplier Management */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-5">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  1 <span className="md:sr-only">Supplier Management</span>
                </span>
              </div>
            </div>
            {/* # Features */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-6">
              <div className="py-2 text-white font-medium mt-4 md:sr-only">Features</div>
            </div>
            {/* Generate Public URLs */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-7">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  <span className="md:sr-only">Generate Public URLs</span>
                </span>
              </div>
            </div>
            {/* API Integrations */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-8">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  <span className="md:sr-only">API Integrations</span>
                </span>
              </div>
            </div>
            {/* Extra Add-ons */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-9">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  <span className="md:sr-only">Extra Add-ons</span>
                </span>
              </div>
            </div>
            {/* Admin Roles */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-10">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Admin Roles</span>
                </span>
              </div>
            </div>
            {/* Admin Roles */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-11">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Admin Roles</span>
                </span>
              </div>
            </div>
            {/* Enterprise Add-ons */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-12">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Enterprise Add-ons</span>
                </span>
              </div>
            </div>
            {/* # Support */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-[13]">
              <div className="py-2 text-white font-medium mt-4 sr-only">Support</div>
            </div>
            {/* Custom Connection */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-[14]">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Custom Connection</span>
                </span>
              </div>
            </div>
          </section>
          {/* End: Essential table */}

          {/* Perform table */}
          <section className="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl dark">
            <div className="relative bg-white/5 px-4 lg:px-6 flex flex-col justify-end">
              <div className="absolute top-0 right-0 mr-6 -mt-4">
                <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-emerald-500 text-white rounded-full shadow-sm shadow-slate-950/5">
                  Most Popular
                </div>
              </div>
              <div className="grow mb-5">
                <div className="font-semibold text-white mb-0.5">Perform</div>
                <div className="mb-1">
                  <span className="text-xl font-medium text-white">$</span>
                  <span className="text-3xl font-bold text-white">
                    {isAnnual ? "49" : "54"}
                  </span>
                  <span className="text-gray-500 font-medium">/mo</span>
                </div>
                <div className="text-sm text-gray-500">Unlimited placeholder texts.</div>
              </div>
              <div className="pb-4 border-b border-white/10">
                <a
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 group"
                  href="#0"
                >
                  Get Started{" "}
                  <span className="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    -&gt;
                  </span>
                </a>
              </div>
            </div>
            {/* # Platform */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-1">
              <div className="py-2 text-white font-medium mt-4 md:sr-only">Platform</div>
            </div>
            {/* Account Access */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-2">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  800 <span className="md:sr-only">Account Access</span>
                </span>
              </div>
            </div>
            {/* Custom Domains */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-3">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  10 <span className="md:sr-only">Custom Domains</span>
                </span>
              </div>
            </div>
            {/* Receipts Forward */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-4">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  Unlimited <span className="md:sr-only">Receipts Forward</span>
                </span>
              </div>
            </div>
            {/* Supplier Management */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-5">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  10 <span className="md:sr-only">Supplier Management</span>
                </span>
              </div>
            </div>
            {/* # Features */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-6">
              <div className="py-2 text-white font-medium mt-4 md:sr-only">Features</div>
            </div>
            {/* Generate Public URLs */}
            <div className="bg-white/5 px-4 lg:px-6 flex flex-col justify-end md:order-7">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  <span className="md:sr-only">Generate Public URLs</span>
                </span>
              </div>
            </div>
            {/* API Integrations */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-8">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  <span className="md:sr-only">API Integrations</span>
                </span>
              </div>
            </div>
            {/* Extra Add-ons */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-9">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  <span className="md:sr-only">Extra Add-ons</span>
                </span>
              </div>
            </div>
            {/* Admin Roles */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-10">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Admin Roles</span>
                </span>
              </div>
            </div>
            {/* Admin Roles */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-11">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Admin Roles</span>
                </span>
              </div>
            </div>
            {/* Enterprise Add-ons */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-12">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Enterprise Add-ons</span>
                </span>
              </div>
            </div>
            {/* # Support */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-[13]">
              <div className="py-2 text-white font-medium mt-4 sr-only">Support</div>
            </div>
            {/* Custom Connection */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-[14]">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Custom Connection</span>
                </span>
              </div>
            </div>
          </section>
          {/* End: Perform table */}

          {/* Enterprise table */}
          <section className="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl">
            <div className="relative bg-white/5 px-6 flex flex-col justify-end">
              <div className="grow mb-5">
                <div className="font-semibold text-white mb-0.5">Enterprise</div>
                <div className="mb-1">
                  <span className="text-xl font-medium text-white">$</span>
                  <span className="text-3xl font-bold text-white">
                    {isAnnual ? "79" : "85"}
                  </span>
                  <span className="text-gray-500 font-medium">/mo</span>
                </div>
                <div className="text-sm text-gray-500">Unlimited placeholder texts.</div>
              </div>
              <div className="pb-4 border-b border-white/10">
                <a
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 group"
                  href="#0"
                >
                  Get Started{" "}
                  <span className="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    -&gt;
                  </span>
                </a>
              </div>
            </div>
            {/* # Platform */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-1">
              <div className="py-2 text-white font-medium mt-4 md:sr-only">Platform</div>
            </div>
            {/* Account Access */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-2">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  Unlimited <span className="md:sr-only">Account Access</span>
                </span>
              </div>
            </div>
            {/* Custom Domains */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-3">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  Unlimited <span className="md:sr-only">Custom Domains</span>
                </span>
              </div>
            </div>
            {/* Receipts Forward */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-4">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  Unlimited <span className="md:sr-only">Receipts Forward</span>
                </span>
              </div>
            </div>
            {/* Supplier Management */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-5">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  Unlimited <span className="md:sr-only">Supplier Management</span>
                </span>
              </div>
            </div>
            {/* # Features */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-6">
              <div className="py-2 text-white font-medium mt-4 md:sr-only">Features</div>
            </div>
            {/* Generate Public URLs */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-7">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  <span className="md:sr-only">Generate Public URLs</span>
                </span>
              </div>
            </div>
            {/* API Integrations */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-8">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  <span className="md:sr-only">API Integrations</span>
                </span>
              </div>
            </div>
            {/* Extra Add-ons */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-9">
              <div className="flex items-center h-full border-b border-white/10 py-2 text-gray-400">
                <svg
                  className="shrink-0 fill-emerald-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                >
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>
                  <span className="md:sr-only">Extra Add-ons</span>
                </span>
              </div>
            </div>
            {/* Admin Roles */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-10">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Admin Roles</span>
                </span>
              </div>
            </div>
            {/* Admin Roles */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-11">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Admin Roles</span>
                </span>
              </div>
            </div>
            {/* Enterprise Add-ons */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-12">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Enterprise Add-ons</span>
                </span>
              </div>
            </div>
            {/* # Support */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-[13]">
              <div className="py-2 text-white font-medium mt-4 sr-only">Support</div>
            </div>
            {/* Custom Connection */}
            <div className="bg-white/5 px-6 flex flex-col justify-end md:order-[14]">
              <div className="flex items-center border-b border-white/10 py-2 text-gray-400 max-md:sr-only">
                <span>
                  <span className="md:sr-only">Custom Connection</span>
                </span>
              </div>
            </div>
          </section>
          {/* End: Enterprise table */}
        </div>
        {/* End: Feature Comparison Pricing Table component */}
      </div>
    </div>
  );
};
