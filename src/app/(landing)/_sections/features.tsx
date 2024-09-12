import { ImageWrapper } from "@/components/image-wrapper";
import { CheckCircle } from "lucide-react";

interface FeatureSectionProps {
  title: string;
  description: string;
  features: string[];
  darkSrc: string;
  lightSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

function FeatureSection({
  title,
  description,
  features,
  darkSrc,
  lightSrc,
  imageAlt,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <div
      className={`flex w-full flex-col gap-6 lg:flex-row ${reverse ? "lg:flex-row-reverse" : ""}`}
    >
      <div className="flex flex-col justify-center space-y-4">
        <h2 className="text-2xl font-medium tracking-tighter md:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-balance text-muted-foreground md:text-base/relaxed lg:text-lg/relaxed">
          {description}
        </p>
        <ul className="grid gap-2 py-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <ImageWrapper
        className="px-6 sm:max-w-4xl md:mr-14 md:min-w-[500px] md:max-w-screen-xl lg:px-8"
        lightSrc={lightSrc}
        darkSrc={darkSrc}
        alt={imageAlt}
        width={650}
        height={375}
      />
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      title: "Schools",
      description:
        "Efficiently manage schools and control user access within the system.",
      features: [
        "Create, update, and organize schools",
        "Assign roles",
        "Proper access control",
      ],
      darkSrc: "/landing/school-dark.png",
      lightSrc: "/landing/school-light.png",
      imageAlt: "School management interface",
    },
    {
      title: "Courses",
      description:
        "Efficiently manage courses and control user access within the system.",
      features: [
        "Assign teachers and students to courses",
        "Manage course details and schedules",
      ],
      darkSrc: "/landing/course-dark.png",
      lightSrc: "/landing/course-light.png",
      imageAlt: "Course management interface",
    },
    {
      title: "Semesters",
      description:
        "Organize courses and classes within specific semesters effortlessly.",
      features: [
        "Organize courses within semesters",
        "Create and manage active or past semesters",
        "View semester start and end dates",
      ],
      darkSrc: "/landing/semester-dark.png",
      lightSrc: "/landing/semester-light.png",
      imageAlt: "Semester management interface",
    },
  ];

  return (
    <section className="container py-12 md:py-24">
      <h2 className="mb-20 text-center text-3xl font-semibold tracking-tighter sm:text-5xl">
        Amazing Features
      </h2>
      <div className="flex flex-col space-y-20 lg:space-y-36">
        {features.map((feature, index) => (
          <FeatureSection
            key={index}
            title={feature.title}
            description={feature.description}
            features={feature.features}
            darkSrc={feature.darkSrc}
            lightSrc={feature.lightSrc}
            imageAlt={feature.imageAlt}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}
