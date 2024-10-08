import Breadcrums from "@/components/Breadcrums/Breadcrums";
import CardProjects from "@/components/CardProjects/CardProjects";
import LoadingSearch from "@/components/LoadingSearch/LoadingSearch";
import Pagination from "@/components/Pagination/Pagination";
import React, { Suspense } from "react";
import BannerCallUs from "../about-us/BannerCallUs";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
const dataProject = [
  {
    src: "/6.jpg",
    url: "#",
    title: "پروژه برج امید",
    address: "تهران ، الهیه",
  },
];

export default function page() {
  return (
    <div className="w-full my-8">
      <div className="w-full max-w-7xl mx-auto mb-20">
        <Breadcrums />
        <div className="mt-6">
          <h1>پروژه های ساختمان یار</h1>
        </div>
        <div className="my-10 grid grid-cols-3 gap-5">
          <CardProjects data={dataProject} />
        </div>
        <div>
          <Suspense fallback={<LoadingSearch />}>
            <Pagination pagination={{ allPage: 1 }} />
          </Suspense>
        </div>
      </div>
      <BannerCallUs />
      <div className="w-full max-w-7xl mx-auto">
        <ContactSocialMedia classDiv="mt-20" />
      </div>
    </div>
  );
}
