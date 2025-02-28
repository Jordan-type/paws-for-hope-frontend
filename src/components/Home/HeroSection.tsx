import React from 'react'
import Link from "next/link"
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import { HeartIcon, LeafIcon, PawPrintIcon, UsersIcon, WalletIcon } from "@/components/ui/Icons"

const HeroSection = ()  => {
  return (
    <>
    <section className="bg-background py-12 sm:py-24 lg:py-32">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
            Protecting and Caring for Animals
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Our organization is dedicated to promoting animal welfare and advocating for the humane treatment of
            all creatures.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="r/create"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Get Involved
            </Link>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Adopt a Pet
            </Link>
          </div>
        </div>
        <Image
          src="/images/living-with-cats-dogs.jpg"
          width={550}
          height={550}
          alt="Hero"
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
        />
      </div>
    </div>
  </section>
  <section className="bg-muted py-12 sm:py-24 lg:py-32">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <Image
          src="/images/paws.jpg"
          width="550"
          height="550"
          alt="Our Mission"
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
        />
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Mission</div>
          <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
            Promoting Animal Welfare
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Our organization is committed to protecting and caring for animals in need. We work tirelessly to
            promote humane treatment, rescue animals from abuse and neglect, and educate the public on the
            importance of animal welfare.
          </p>
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  </section>
  <section className="bg-background py-12 sm:py-24 lg:py-32">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 text-center">
        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Recent Initiatives</div>
        <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">Making a Difference</h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          From rescuing abandoned pets to advocating for stronger animal protection laws, our organization is
          constantly working to improve the lives of animals in our community and beyond.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
            <PawPrintIcon className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Rescue and Rehome</h3>
            <p className="text-muted-foreground">
              We work tirelessly to rescue abandoned and abused animals, providing them with a safe haven and
              finding them loving forever homes.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
            <LeafIcon className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Advocacy and Education</h3>
            <p className="text-muted-foreground">
              We advocate for stronger animal protection laws and educate the public on the importance of animal
              welfare and responsible pet ownership.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
            <HeartIcon className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Volunteer and Donate</h3>
            <p className="text-muted-foreground">
              Join our team of dedicated volunteers or consider making a donation to support our mission and help
              us continue our important work.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
  <section className="bg-muted py-12 sm:py-24 lg:py-32">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 text-center">
        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Get Involved</div>
        <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">Join Our Cause</h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          There are many ways you can get involved and support our mission to protect and care for animals in
          need. Whether you want to volunteer, adopt a pet, or make a donation, we appreciate your support.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
            <UsersIcon className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Volunteer</h3>
            <p className="text-muted-foreground">
              Join our team of dedicated volunteers and help us make a difference in the lives of animals.
            </p>
            <Link
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
            <PawPrintIcon className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Adopt a Pet</h3>
            <p className="text-muted-foreground">
              Browse our available pets and find your new furry friend today.
            </p>
            <Link
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Adopt Now
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
            <WalletIcon className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Donate</h3>
            <p className="text-muted-foreground">
              Your financial support helps us continue our important work and make a lasting impact on the lives
              of animals.
            </p>
            <Link
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Donate Now
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
  </>
  )
}

export default HeroSection



