import Link from "next/link";
import { Globe } from "lucide-react";

const footerLinks = [
{
  title: "Product",
  links: [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Download", href: "/download" },
  { name: "Solutions", href: "/#solutions" }]

},
{
  title: "Solutions",
  links: [
  { name: "Online Meetings", href: "/solutions/online-meetings" },
  { name: "Physical Meetings", href: "/solutions/physical-meetings" },
  { name: "Developer API", href: "/solutions/api" }]

},
{
  title: "Resources",
  links: [
  { name: "Documentation", href: "/docs" },
  { name: "Community", href: "/community" },
  { name: "Blog", href: "/blog" },
  { name: "Partnership", href: "/partnership" }]

},
{
  title: "Company",
  links: [
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" }]

}];


export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <span className="text-xl font-heading font-bold tracking-tighter">
                  Verto<span className="text-primary">X</span>
                </span>
              </Link>
            <p className="text-muted-foreground max-w-sm mb-4">
              VertoX translates speech in real time while preserving the speaker’s voice, tone and emotion. Low latency (~0.5s), 25+ languages, and enterprise-grade security.
            </p>
            <p className="text-xs text-muted-foreground">
              Need help? Contact <a href="mailto:support@vertox.ai" className="hover:text-primary transition-colors font-bold">support@vertox.ai</a>
            </p>
          </div>
          {footerLinks.map((section) =>
          <div key={section.title}>
              <h4 className="font-heading font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) =>
              <li key={link.name}>
                    <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors">

                      {link.name}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground !w-[217px] !h-4">
            © {new Date().getFullYear()} VertoX AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 !w-[118px] !h-5">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">LinkedIn</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors !whitespace-pre-line"></Link>
          </div>
        </div>
      </div>
    </footer>);

}