
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Zap, Briefcase } from "lucide-react";
import { useState } from 'react';

const PricingPage: React.FC = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planName: string, price: string) => {
    setLoadingPlan(planName);
    // Placeholder: Implement your actual subscription logic here
    // This could involve calling an API endpoint to handle the subscription
    console.log(`User clicked subscribe for ${planName} at ${price}`);
    alert(`Subscription feature for ${planName} is currently a placeholder.`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoadingPlan(null);
  };

  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      description: "Essential tools for individuals getting started.",
      features: [
        "Manage up to 50 affiliate links",
        "Basic Analytics",
        "AI Description Generation (10/month)",
        "Email Support",
      ],
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      popular: false,
    },
    {
      name: "Premium",
      price: "$19.99",
      description: "Advanced features for growing marketers.",
      features: [
        "Manage up to 250 affiliate links",
        "Advanced Analytics & Reports",
        "AI Description Generation (50/month)",
        "Blog Integration Tools",
        "Priority Email Support",
      ],
      icon: <Zap className="h-6 w-6 text-primary" />,
      popular: true,
    },
    {
      name: "Business",
      price: "$49.99",
      description: "For serious marketers, agencies, and teams.",
      features: [
        "Unlimited Affiliate Links",
        "Custom Reporting & API Access",
        "AI Description Generation (Unlimited)",
        "Team Access (up to 5 users)",
        "Dedicated Phone & Chat Support",
      ],
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      popular: false,
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Find the Perfect Plan
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose a plan that fits your needs and start maximizing your affiliate marketing potential today.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col rounded-xl shadow-lg transition-all hover:shadow-2xl ${
              plan.popular ? "border-2 border-primary ring-2 ring-primary/50" : "border"
            }`}
          >
            <CardHeader className="p-6">
              {plan.popular && (
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-1 rounded-full inline-block">
                  Most Popular
                </div>
              )}
              <div className="flex items-center space-x-3 mb-2">
                {plan.icon}
                <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
              </div>
              <CardDescription className="text-sm min-h-[40px]">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-sm font-medium text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 mt-auto">
              <Button
                className={`w-full text-lg py-3 ${plan.popular ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"}`}
                disabled={loadingPlan === plan.name}
                onClick={() => handleSubscribe(plan.name, plan.price)}
                size="lg"
              >
                {loadingPlan === plan.name ? "Processing..." : `Get Started with ${plan.name}`}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="text-center mt-12 text-sm text-muted-foreground">
        All plans are currently placeholders. Payment integration is not implemented.
      </p>
    </div>
  );
};

export default PricingPage;

    