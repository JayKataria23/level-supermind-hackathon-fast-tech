import { Linkedin } from "lucide-react";
import { Github } from "lucide-react";
import Image from "next/image";
import React from "react";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
}
const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Jay Kataria",
    role: "Full Stack Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHWvMcBiAqVag/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1680287478048?e=1741824000&v=beta&t=rUOFFtmxCpWZwnN7QQGq2FoVlBSKQ5zbc84WWDSTzuQ",
    github: "https://github.com/JayKataria23",
    linkedin: "https://www.linkedin.com/in/jay-kataria-209929183/",
  },
  {
    name: "Isha Singla",
    role: "Data Analytics",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEMA668YQ0Jmg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1677759147526?e=1741824000&v=beta&t=viYRNkQCaCNtZtcv2SUwqnDzJwr0-HtVnCNnFQ6_P8s",
    github: "https://github.com/courseraisha",
    linkedin: "https://www.linkedin.com/in/isha-singla16/",
  },
];

function Team() {
  return (
    <section id="team" className="w-full py-16 md:py-28 lg:py-32 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
              We are a group of passionate individuals dedicated to helping you
              understand and grow your Instagram presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 lg:p-8 transition-all duration-300 hover:bg-white/10 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden ring-4 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-base lg:text-lg text-gray-400 group-hover:text-gray-300 transition-colors">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5 lg:h-6 lg:w-6" />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5 lg:h-6 lg:w-6" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
