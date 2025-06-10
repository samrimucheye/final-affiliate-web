
"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Users, Target, Lightbulb, Mail } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="shadow-xl overflow-hidden">
        <div className="relative h-48 sm:h-64 w-full">
            <Image
                src="https://placehold.co/1200x400.png"
                alt="AffiliateLink Hub team working"
                fill
                priority
                className="object-cover"
                data-ai-hint="team collaboration"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">About AffiliateLink Hub</h1>
            </div>
        </div>
        <CardContent className="p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center">
              <Target className="mr-3 h-7 w-7" /> Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is to empower affiliate marketers, content creators, and online entrepreneurs
              with intuitive and powerful tools to streamline their affiliate marketing efforts. We aim to
              simplify link management, boost productivity through AI-driven content generation, and
              ultimately help you maximize your passive income potential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center">
              <Lightbulb className="mr-3 h-7 w-7" /> What We Do
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              AffiliateLink Hub provides a comprehensive platform for managing all your affiliate links in one
              centralized dashboard. From adding and organizing links to leveraging AI for generating compelling
              product descriptions, we provide the resources you need to succeed. Our platform is designed to be
              user-friendly, efficient, and adaptable to your growing needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center">
              <Users className="mr-3 h-7 w-7" /> Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
              <li>Centralized Affiliate Link Management</li>
              <li>AI-Powered Product Description Generation</li>
              <li>Secure User Authentication & Admin Controls</li>
              <li>Easy Link Promotion Tools</li>
              <li>Responsive Design for Access Anywhere</li>
              <li>Integrated Blog for Content Marketing</li>
              <li>Customizable Themes and Accessibility Options</li>
            </ul>
          </section>

          <section className="text-center py-6 bg-muted/50 rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center justify-center">
              <Mail className="mr-3 h-7 w-7 text-primary" /> Get In Touch
            </h2>
            <p className="text-muted-foreground mb-6">
              Have questions, feedback, or just want to say hello? We'd love to hear from you!
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;

    