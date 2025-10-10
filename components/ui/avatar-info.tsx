"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RiLinkedinBoxFill, RiTwitterXFill, RiMailLine, RiCameraLine } from "@remixicon/react"
import { Laugh } from "lucide-react"
import { Button } from "./button"

export function AvatarInfo() {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="cursor-pointer relative z-[60]">
        <Avatar className="size-10 ring-1 ring-offset-2 ring-offset-background transition-all">
          <AvatarImage src="/kotsas_photo.JPEG" alt="Giannis Kotsas" />
          <AvatarFallback>GK</AvatarFallback>
        </Avatar>
      </button>
      
      {/* Custom hover card that doesn't use Portal */}
      {isHovered && (
        <div className="absolute -top-4 -left-4 w-80 pl-4 pr-4 pt-16 bg-popover text-popover-foreground rounded-lg border shadow-md z-50">
          <div className="space-y-3 mt-2">
            {/* Name and Nationality */}
            <div>
              <h4 className="text-sm font-semibold leading-none">Giannis Kotsakiachidis</h4>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-lg leading-none">🇬🇷</span>
                <p className="text-xs text-muted-foreground">Greek</p>
              </div>
            </div>

            {/* Hobbies */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Finds amusing</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-background border border-border text-xs">
                  😂 Dad jokes
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-background border border-border text-xs">
                  📸 Photography
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-background border border-border text-xs">
                  🎾 Padel
                </span>
              </div>
            </div>

            {/* Contact & Social */}
            {/* Social Icons - Absolute Top Right */}
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="p-1"
              >
                <a
                  href="mailto:giannis@kotsas.com"
                  aria-label="Email"
                >
                  <RiMailLine className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="icon"
                variant="outline"
                className="p-1"
              >
                <a
                  href="https://twitter.com/gianniskotsas_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <RiTwitterXFill className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="icon"
                variant="outline"
                className="p-1"
              >
                <a
                  href="https://linkedin.com/in/gianniskotsas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <RiLinkedinBoxFill className="size-4" />
                </a>
              </Button>
            </div>
            <div className="space-y-2 pt-1" />
          </div>
        </div>
      )}
    </div>
  )
}