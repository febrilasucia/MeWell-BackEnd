import React from "react";
import CardBlog from "../../components/Blog/CardBlog";
import HeroSection from "../../components/Blog/HeroSection";
import Layout from "../Layout";

function ListBlog() {
  return (
    <Layout>
      <HeroSection />
      <div className="mb-20">
        <CardBlog />
      </div>
    </Layout>
  );
}

export default ListBlog;
