import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import Header from "./_components/Header";
import Features from "./_components/Features";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div> 
      <Hero />
      <Features />
      <Footer/>
    </div>
  );
}
