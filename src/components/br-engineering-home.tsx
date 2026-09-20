import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  Factory,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Settings,
  Sun,
  Wrench,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import heroImage from "@/assets/br-hero-lathe.jpg";
import workshopImage from "@/assets/br-workshop.jpg";
import latheImage from "@/assets/br-lathe.jpg";
import toolsImage from "@/assets/br-tools.jpg";
import industrialImage from "@/assets/br-industrial.jpg";
import chucksImage from "@/assets/br-chucks.jpg";
import equipmentImage from "@/assets/br-workshop-equipment.jpg";

const PHONE = "9487585476";
const WHATSAPP = "https://wa.me/919487585476";
const EMAIL = "brengineeringcbe@gmail.com";
const MAP_URL =
  "https://www.google.com/maps?q=626%2C%20806%2C%20Mettupalayam%20Main%20Rd%2C%20near%20Shanmugha%20Theatre%2C%20R.S.%20Puram%2C%20Coimbatore%2C%20Tamil%20Nadu&output=embed";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=626%2C%20806%2C%20Mettupalayam%20Main%20Rd%2C%20near%20Shanmugha%20Theatre%2C%20R.S.%20Puram%2C%20Coimbatore%2C%20Tamil%20Nadu";

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Machinery", "#machinery"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
] as const;

const products = [
  {
    title: "Lathe Machines",
    description: "Reliable turning equipment for precision workshop and production requirements.",
    image: latheImage,
  },
  {
    title: "Machine Tools",
    description: "Essential cutting, measuring and workholding tools for engineering operations.",
    image: toolsImage,
  },
  {
    title: "Industrial Machinery",
    description: "Purposeful machinery solutions for manufacturing and industrial applications.",
    image: industrialImage,
  },
  {
    title: "Chucks",
    description: "Precision workholding solutions for secure and dependable machining.",
    image: chucksImage,
  },
  {
    title: "Workshop Equipment",
    description: "Practical equipment to support efficient, capable engineering workspaces.",
    image: equipmentImage,
  },
];

const reasons = [
  ["01", "Industry Experience", "A legacy rooted in serving engineering and manufacturing needs since 1976."],
  ["02", "Machinery Expertise", "Focused knowledge across workshop machinery, machine tools and accessories."],
  ["03", "Practical Solutions", "Recommendations shaped around real workshop requirements and applications."],
  ["04", "Responsive Support", "Direct, accessible assistance for product questions and enquiries."],
  ["05", "Long-Term Relationships", "A business approach built around consistency, trust and continuity."],
];

const applications = [
  ["Engineering Workshops", Wrench],
  ["Manufacturing Units", Factory],
  ["Machine Shops", Settings],
  ["Industrial Applications", Building2],
  ["Workshop Environments", Wrench],
] as const;

const gallery = [heroImage, workshopImage, latheImage, toolsImage, chucksImage];

function BrandMark() {
  return (
    <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="BR Engineering Company home">
      <span className="grid h-10 w-10 shrink-0 place-items-center bg-primary text-sm font-extrabold text-primary-foreground">
        BR
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-sm font-extrabold uppercase text-foreground sm:text-base">
          BR Engineering
        </span>
        <span className="block text-[10px] font-semibold uppercase text-muted-foreground">Company · Coimbatore</span>
      </span>
    </a>
  );
}

function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("br-theme");
    const shouldUseDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", shouldUseDark);
    setDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("br-theme", next ? "dark" : "light");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size={compact ? "icon" : "default"}
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="shrink-0"
    >
      {dark ? <Sun /> : <Moon />}
      {!compact && <span>{dark ? "Light Mode" : "Dark Mode"}</span>}
    </Button>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase text-primary">
        <span className="h-px w-8 bg-primary" /> {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>}
    </div>
  );
}

export function BrEngineeringHome() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const openEnquiry = (product = "our machinery") => setSelectedProduct(product);

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Machinery enquiry — ${selectedProduct ?? "General"}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto grid min-h-9 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 text-[11px] font-medium sm:px-6 lg:px-8">
          <span className="truncate"><MapPin className="mr-1 inline h-3 w-3" />626, 806, Mettupalayam Main Rd, R.S. Puram, Coimbatore</span>
          <div className="flex items-center gap-4">
            <a href={`tel:${PHONE}`} className="whitespace-nowrap"><Phone className="mr-1 inline h-3 w-3" />{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="hidden lg:inline"><Mail className="mr-1 inline h-3 w-3" />{EMAIL}</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <div className="flex items-center gap-1 lg:gap-3">
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
                  {label}
                </a>
              ))}
            </nav>
            <div className="hidden sm:block"><ThemeToggle /></div>
            <Button className="hidden md:inline-flex" onClick={() => openEnquiry()}>Enquire Now <ArrowRight /></Button>
            <div className="sm:hidden"><ThemeToggle compact /></div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation"><Menu /></Button>
              </SheetTrigger>
              <SheetContent className="w-[88vw] max-w-sm">
                <SheetHeader className="border-b border-border pb-5 text-left"><SheetTitle><BrandMark /></SheetTitle></SheetHeader>
                <nav className="mt-8 grid gap-2" aria-label="Mobile navigation">
                  {navItems.map(([label, href]) => (
                    <SheetClose asChild key={href}>
                      <a href={href} className="flex items-center justify-between border-b border-border px-1 py-4 text-lg font-bold">{label}<ChevronRight className="h-4 w-4 text-primary" /></a>
                    </SheetClose>
                  ))}
                </nav>
                <Button className="mt-8 w-full" size="lg" onClick={() => openEnquiry()}>Enquire Now <ArrowRight /></Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="relative flex min-h-[calc(100svh-108px)] items-end overflow-hidden bg-industrial text-industrial-foreground">
          <img src={heroImage} alt="Precision lathe machine in an engineering workshop" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative mx-auto grid w-full max-w-7xl items-end gap-12 px-4 pb-10 pt-24 sm:px-6 md:pb-14 lg:grid-cols-[minmax(0,1fr)_310px] lg:px-8">
            <div className="max-w-4xl">
              <p className="mb-5 text-xs font-bold uppercase text-brand-bright">Engineering Machinery · Coimbatore</p>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.06] text-industrial-foreground sm:text-6xl lg:text-7xl">
                Reliable Machinery.<br />Built for Engineering.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-industrial-muted sm:text-lg">
                Workshop machinery, machine tools and practical engineering solutions backed by decades of industry experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg"><a href="#machinery">Explore Machinery <ArrowRight /></a></Button>
                <Button asChild size="lg" variant="outline" className="border-industrial-foreground/40 bg-industrial/30 text-industrial-foreground hover:bg-industrial-foreground hover:text-industrial">
                  <a href="#contact">Contact Us</a>
                </Button>
              </div>
            </div>
            <div className="border-l-2 border-brand-bright bg-industrial/70 p-5 backdrop-blur-md lg:mb-4">
              <p className="text-[11px] font-bold uppercase text-brand-bright">Serving the engineering industry</p>
              <p className="mt-1 text-xl font-extrabold">Since 1976</p>
            </div>
            <div className="grid grid-cols-2 border-t border-industrial-foreground/20 pt-6 sm:grid-cols-4 lg:col-span-2">
              {["Since 1976", "Engineering Machinery", "Coimbatore Based", "Industry Experience"].map((item) => (
                <div key={item} className="border-l border-industrial-foreground/20 px-4 py-3 first:border-l-0 first:pl-0 sm:px-6">
                  <Check className="mb-2 h-4 w-4 text-brand-bright" /><span className="text-xs font-bold uppercase text-industrial-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
              <div>
                <SectionHeading eyebrow="Our Legacy" title="Built on Experience. Evolving with Engineering." />
                <div className="mt-8 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
                  <p>Established in 1976 as M/s. Enness Engineering Co. by our founder, Mr. M. Nandanan, our company began its journey with a commitment to serving the engineering and manufacturing industry with reliable machinery and quality engineering products.</p>
                  <p>In 2016, the company was renamed M/s. BR Engineering Company under the proprietorship of Mr. M. Ramachandran, marking a new chapter in our growth while continuing the strong foundation and values established by our founder.</p>
                </div>
                <div className="mt-10 border-l border-border">
                  {[
                    ["1976", "M/s. Enness Engineering Co. established"],
                    ["2016", "Transition to BR Engineering Company"],
                    ["TODAY", "Continuing the legacy with modern engineering solutions"],
                  ].map(([year, text]) => (
                    <div key={year} className="relative grid grid-cols-[70px_1fr] gap-5 pb-7 pl-6 last:pb-0">
                      <span className="absolute -left-[5px] top-1 h-[9px] w-[9px] bg-primary" />
                      <strong className="text-sm text-primary">{year}</strong><span className="text-sm font-semibold text-foreground">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img src={workshopImage} alt="Engineering workshop with rows of machine tools" width={1408} height={1008} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="absolute -bottom-5 -left-3 bg-primary px-6 py-5 text-primary-foreground sm:-left-6">
                  <span className="block text-3xl font-extrabold">1976</span><span className="text-[10px] font-bold uppercase">Where our journey began</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="machinery" className="border-y border-border bg-muted/45 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Our Products" title="Machinery & Engineering Solutions" description="Equipment for workshops, manufacturers and engineering professionals." />
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
              {products.map((product, index) => (
                <article key={product.title} className={`group overflow-hidden border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
                  <div className={`overflow-hidden ${index < 2 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <img src={product.image} alt={product.title} width={1200} height={912} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-card-foreground">{product.title}</h3>
                    <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{product.description}</p>
                    <Button variant="link" className="mt-4 h-auto p-0 font-bold" onClick={() => openEnquiry(product.title)}>Enquire Now <ArrowRight /></Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-tint py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Why BR Engineering" title="Experience that works for you." />
            <div className="mt-12 grid gap-px bg-primary/15 md:grid-cols-2 lg:grid-cols-5">
              {reasons.map(([number, title, description]) => (
                <article key={number} className="min-h-64 bg-brand-tint p-6 transition-colors hover:bg-card">
                  <span className="text-xs font-extrabold text-primary">{number}</span>
                  <h3 className="mt-16 text-lg font-extrabold text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <SectionHeading eyebrow="Applications" title="Supporting Engineering & Manufacturing" description="Machinery and workshop solutions for the environments where practical engineering happens." />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {applications.map(([title, Icon], index) => (
                  <div key={title} className={`flex min-h-28 items-center gap-5 border border-border p-5 ${index === 4 ? "sm:col-span-2" : ""}`}>
                    <span className="grid h-12 w-12 shrink-0 place-items-center bg-brand-tint text-primary"><Icon className="h-5 w-5" /></span>
                    <span className="font-bold">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-industrial py-20 text-industrial-foreground sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="[&_*]:border-industrial-foreground/20"><SectionHeading eyebrow="Gallery" title="Inside BR Engineering" description="A glimpse into our machinery, workspace and engineering environment." /></div>
            <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
              {gallery.map((image, index) => (
                <button key={image} type="button" onClick={() => setLightboxImage(image)} className={`group relative overflow-hidden ${index === 0 ? "col-span-2 row-span-2" : index === 1 ? "col-span-2" : ""}`} aria-label={`View gallery image ${index + 1}`}>
                  <img src={image} alt="BR Engineering machinery and workshop" width={index < 2 ? 1408 : 1200} height={index < 2 ? 1008 : 912} loading="lazy" className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                </button>
              ))}
              <button type="button" onClick={() => setLightboxImage(equipmentImage)} className="grid place-items-center bg-primary p-5 text-center text-primary-foreground transition-colors hover:bg-brand-bright">
                <span><strong className="block text-3xl">+12</strong><span className="mt-1 block text-xs font-bold uppercase">More Photos</span></span>
              </button>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid overflow-hidden border border-border bg-card lg:grid-cols-[.8fr_1.2fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <SectionHeading eyebrow="Find Us" title="Visit BR Engineering" />
                <div className="mt-8 space-y-6 text-sm">
                  <div className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" /><p className="leading-6 text-muted-foreground">626, 806, Mettupalayam Main Rd,<br />near Shanmugha Theatre, Sukrawar Pettai,<br />R.S. Puram, Coimbatore, Tamil Nadu, India</p></div>
                  <a href={`tel:${PHONE}`} className="flex items-center gap-4 font-semibold"><Phone className="h-5 w-5 text-primary" />{PHONE}</a>
                  <a href={`mailto:${EMAIL}`} className="flex min-w-0 items-center gap-4 font-semibold"><Mail className="h-5 w-5 shrink-0 text-primary" /><span className="truncate">{EMAIL}</span></a>
                </div>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button asChild><a href={DIRECTIONS_URL} target="_blank" rel="noreferrer"><MapPin />Get Directions</a></Button>
                  <Button asChild variant="outline"><a href={`tel:${PHONE}`}><Phone />Call Now</a></Button>
                  <Button asChild variant="outline" className="text-whatsapp"><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button>
                </div>
              </div>
              <div className="min-h-[420px] bg-muted">
                <iframe title="BR Engineering Company location in Coimbatore" src={MAP_URL} className="h-full min-h-[420px] w-full border-0 grayscale-[.15]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
          <img src={heroImage} alt="" width={1920} height={1088} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-luminosity" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
            <div><h2 className="text-3xl font-extrabold sm:text-5xl">Looking for the Right Machinery?</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/80 sm:text-base">Talk to us about your workshop or engineering requirements. We’ll help you take the next step.</p></div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary"><a href={`tel:${PHONE}`}><Phone />Call Us</a></Button>
              <Button asChild size="lg" variant="secondary"><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp Us</a></Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={() => openEnquiry()}>Send an Enquiry</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-footer text-footer-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          <div><div className="inline-flex items-center gap-3"><span className="grid h-10 w-10 place-items-center bg-primary text-sm font-extrabold text-primary-foreground">BR</span><span className="font-extrabold uppercase">BR Engineering Company</span></div><p className="mt-5 max-w-sm text-sm leading-6 text-footer-muted">Workshop machineries, engineering machinery and machine tools in Coimbatore.</p></div>
          <div><h3 className="text-xs font-bold uppercase text-brand-bright">Quick Links</h3><div className="mt-5 grid grid-cols-2 gap-3 text-sm text-footer-muted">{navItems.map(([label, href]) => <a key={href} href={href} className="hover:text-footer-foreground">{label}</a>)}</div></div>
          <div><h3 className="text-xs font-bold uppercase text-brand-bright">Contact</h3><div className="mt-5 space-y-3 text-sm text-footer-muted"><p>R.S. Puram, Coimbatore</p><a className="block hover:text-footer-foreground" href={`tel:${PHONE}`}>{PHONE}</a><a className="block break-all hover:text-footer-foreground" href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div>
        </div>
        <div className="border-t border-footer-border"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><p>© 2026 BR Engineering Company. All rights reserved.</p><p><strong className="text-footer-foreground">Website by ZETHICA</strong> · One partner. Every digital need.</p></div></div>
      </footer>

      <Dialog open={selectedProduct !== null} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader><DialogTitle className="text-2xl">Machinery Enquiry</DialogTitle><DialogDescription>Tell us how we can help. Your email app will open with these details ready to send.</DialogDescription></DialogHeader>
          <form onSubmit={submitEnquiry} className="mt-2 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Name<Input name="name" required placeholder="Your name" /></label><label className="grid gap-2 text-sm font-semibold">Phone<Input name="phone" required inputMode="tel" placeholder="Phone number" /></label></div>
            <label className="grid gap-2 text-sm font-semibold">Email<Input name="email" required type="email" placeholder="Email address" /></label>
            <label className="grid gap-2 text-sm font-semibold">Message<Textarea name="message" required rows={5} defaultValue={`I'm interested in ${selectedProduct ?? "our machinery"}. Please share more details.`} /></label>
            <div className="grid gap-2 sm:grid-cols-3"><Button type="submit">Send Enquiry</Button><Button asChild variant="outline"><a href={`tel:${PHONE}`}><Phone />Call</a></Button><Button asChild variant="outline" className="text-whatsapp"><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button></div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={lightboxImage !== null} onOpenChange={(open) => !open && setLightboxImage(null)}>
        <DialogContent className="max-w-5xl border-0 bg-industrial p-2 shadow-2xl">
          <DialogHeader className="sr-only"><DialogTitle>Gallery image</DialogTitle><DialogDescription>Enlarged machinery photograph</DialogDescription></DialogHeader>
          {lightboxImage && <img src={lightboxImage} alt="Enlarged BR Engineering machinery view" className="max-h-[82vh] w-full object-contain" />}
        </DialogContent>
      </Dialog>

      <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-xl transition-transform hover:scale-105"><MessageCircle className="h-6 w-6" /></a>
    </div>
  );
}