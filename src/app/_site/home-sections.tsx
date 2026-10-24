import Image from "next/image";
import Link from "next/link";

import {
  anchors,
  closing,
  covers,
  faqs,
  faqTopics,
  gbp,
  groupsBand,
  hajjBand,
  hero,
  journeys,
  lastTrip,
  leader,
  meaning,
  paying,
  people,
  privateBand,
  reviews,
  routes,
  say,
  starts,
  stay,
  strip,
  teachers,
  whyRawdah,
  type Faq,
} from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { Actions, Framed, gutter, Heading, Label, onGold, onInk, Square, TileLink, WaTile } from "@/app/_site/shell";
import { TripRow } from "@/app/_site/trip-row";
import { Chevron } from "@/app/_site/whatsapp";

const pad = "py-[clamp(3.5rem,7vw,6.5rem)]";
const h2 = "text-[clamp(2.4rem,4.4vw,4.2rem)]";

/* ------------------------------------------------------------------------ */
/* Hero: the words on date brown beside a mosaic of Rawdah's own trips.      */
/* ------------------------------------------------------------------------ */

function HeroMosaic() {
  const [a, b, c, , e] = hero.mosaic;
  const tile = "tile-in relative overflow-hidden bg-ink-deep";
  return (
    <div className="grid aspect-[3/2] grid-cols-3 grid-rows-2 gap-1.5 lg:aspect-[5/4] lg:grid-cols-4 lg:grid-rows-3">
      <div className={`${tile} col-span-2 row-span-2 lg:col-span-3`}>
        <Image src={a.src} alt={a.alt} fill priority sizes="(min-width: 1024px) 44vw, 66vw" className={`object-cover ${a.position}`} />
      </div>
      <div className={`${tile} col-start-3 row-start-1 lg:col-start-4 lg:row-span-2`} style={{ animationDelay: "90ms" }}>
        <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 15vw, 33vw" className={`object-cover ${b.position}`} />
      </div>
      <div className={`${tile} col-start-3 row-start-2 lg:col-start-1 lg:row-start-3`} style={{ animationDelay: "180ms" }}>
        <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 15vw, 33vw" className={`object-cover ${c.position}`} />
      </div>
      <div className={`${tile} hidden lg:col-span-2 lg:col-start-2 lg:row-start-3 lg:block`} style={{ animationDelay: "270ms" }}>
        <Image src={e.src} alt={e.alt} fill sizes="30vw" className={`object-cover ${e.position}`} />
      </div>
      <div className="tile-in hidden place-items-center bg-clay lg:col-start-4 lg:row-start-3 lg:grid" style={{ animationDelay: "360ms" }}>
        <Image src="/images/brand/mark-cream.png" alt="" width={387} height={672} className="h-[46%] w-auto opacity-90" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className={`bg-ink text-canvas ${onInk}`}>
      <div className={`grid grid-cols-1 gap-x-14 gap-y-7 pt-4 pb-[clamp(2.75rem,5vw,4.5rem)] lg:grid-cols-12 lg:items-center lg:pt-8 ${gutter}`}>
        <div className="lg:order-2 lg:col-span-7">
          <HeroMosaic />
        </div>
        <div className="lg:order-1 lg:col-span-5">
          <Label tone="canvas">{hero.label}</Label>
          <Heading as="h1" className="mt-4 text-[clamp(2.75rem,5vw,5.3rem)]">
            {hero.headline}
          </Heading>
          <p className="mt-5 max-w-[34rem] text-[1.02rem] leading-[1.7] text-canvas/80">
            {hero.text.value}
            <Mark s={hero.text.status} />
          </p>
          <Actions primary={{ label: "Register for Hajj 2027", href: strip.href }} waText={say.general} tone="ink" className="mt-7" />
          <ul className="mt-8 grid grid-cols-1 gap-2.5 border-t border-canvas/15 pt-5 text-[0.88rem] text-canvas/75 sm:grid-cols-3 sm:gap-4">
            {hero.facts.map((f) => (
              <li key={f.value} className="flex items-start gap-2.5">
                <Square className="mt-[0.45em] bg-gold-soft" />
                <span>
                  {f.value}
                  <Mark s={f.status} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Where would you like to start? One tile for each kind of traveller.      */
/* ------------------------------------------------------------------------ */

export function Starts() {
  return (
    <section className={`bg-canvas pt-[clamp(3rem,6vw,5rem)] ${gutter}`}>
      <Heading className="text-[clamp(2rem,3.4vw,3.1rem)]">Where would you like to start?</Heading>
      <ul className="mt-7 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
        {starts.map((s) => (
          <li key={s.title}>
            <Link href={s.href} className="group flex h-full items-stretch rounded-[3px] bg-canvas-warm transition-colors duration-200 hover:bg-ink hover:text-canvas">
              <span className="flex flex-1 flex-col p-5">
                <span className="text-[0.78rem] font-medium text-bronze group-hover:text-gold-soft">
                  {s.tag.value}
                  <Mark s={s.tag.status} />
                </span>
                <span className="display mt-3 text-[1.85rem] sm:mt-8">{s.title}</span>
                <span className="mt-1.5 text-[0.92rem] text-ink/65 group-hover:text-canvas/75">{s.text}</span>
              </span>
              <span aria-hidden className="grid w-12 shrink-0 place-items-center border-l border-ink/10 group-hover:border-canvas/15 group-hover:text-gold-soft">
                <Chevron className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Our trips, as rows with a price block each.                               */
/* ------------------------------------------------------------------------ */

export function Trips() {
  return (
    <section id="trips" className={`scroll-mt-24 bg-canvas pt-[clamp(3.5rem,7vw,6rem)] pb-[clamp(3.5rem,7vw,6rem)] ${gutter}`}>
      <div className="flex items-end justify-between gap-6 pb-5">
        <Heading className={h2}>Our trips</Heading>
        <Link href={routes.trips} className="flex items-center gap-1.5 pb-2 text-[0.92rem] font-medium underline decoration-gold decoration-2 underline-offset-[0.35em]">
          Every trip <Chevron className="size-3" />
        </Link>
      </div>
      <div className="border-b border-ink/15">
        {journeys.map((j) => (
          <TripRow key={j.slug} j={j} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Hajj 2027 on sand-gold: the talbiyah, and the five steps to Hajj.         */
/* ------------------------------------------------------------------------ */

export function HajjBand() {
  return (
    <section id="hajj" className={`bg-gold-soft text-ink-deep ${onGold} ${pad} ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p lang="ar" className="ar text-left text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.7] text-ink">
            {hajjBand.talbiyah}
          </p>
          <p className="text-[0.86rem] text-ink/70">{hajjBand.talbiyahEn}</p>
          <Heading className="mt-7 text-[clamp(4.2rem,9vw,8.5rem)] leading-[0.88]">{hajjBand.headline}</Heading>
          <p className="mt-6 max-w-[30rem] text-[1.02rem] leading-[1.7] text-ink/85">
            {hajjBand.text.value}
            <Mark s={hajjBand.text.status} />
          </p>
          <Actions primary={{ label: "Register for Hajj 2027", href: strip.href }} waText={say.hajj} tone="gold" className="mt-8" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="border-b border-ink/20">
            {hajjBand.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-ink/20 py-4">
                <span className="display grid size-11 place-items-center bg-ink text-[1.5rem] text-gold-soft">{i + 1}</span>
                <span>
                  <span className="block text-[1.02rem] font-medium">
                    {s.title}
                    <Mark s={s.status} />
                  </span>
                  <span className="mt-0.5 block text-[0.93rem] leading-[1.6] text-ink/75">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <figure className="mt-8 grid grid-cols-[7rem_1fr] items-center gap-5 sm:grid-cols-[10rem_1fr]">
            <div className="relative aspect-square overflow-hidden bg-ink">
              <Image src={hajjBand.photo.src} alt={hajjBand.photo.alt} fill sizes="10rem" className="object-cover object-[50%_60%]" />
            </div>
            <figcaption className="text-[0.92rem] text-ink/80">
              {hajjBand.photo.caption}.{" "}
              <Link href={routes.hajj} className="font-medium underline decoration-ink/40 underline-offset-4">
                Read about Hajj 2027
              </Link>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Our last trip: the facts, and the trip in six photographs.               */
/* ------------------------------------------------------------------------ */

export function LastTrip() {
  return (
    <section className={`bg-ink text-canvas ${onInk} ${pad} ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Label tone="canvas">{lastTrip.label}</Label>
          <Heading className="mt-4 text-[clamp(2.4rem,4vw,3.8rem)]">{lastTrip.name}</Heading>
          <dl className="mt-7 border-b border-canvas/15 text-[0.92rem]">
            {lastTrip.facts.map((f) => (
              <div key={f.k} className="grid grid-cols-[5.5rem_1fr] gap-3 border-t border-canvas/15 py-3">
                <dt className="text-canvas/55">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <TileLink href={routes.lastTrip} tone="gold" className="mt-7 w-full sm:w-auto">
            See how the trip ran
          </TileLink>
        </div>
        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:col-span-8">
          {lastTrip.photos.map((p) => (
            <li key={p.src} className="relative aspect-square overflow-hidden bg-ink-deep">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 21vw, (min-width: 640px) 33vw, 50vw" className={`object-cover ${p.position}`} />
              <span className="absolute bottom-0 left-0 bg-ink/85 px-2 py-1 text-[0.72rem] text-canvas/90">{p.caption}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Why choose Rawdah: five plain reasons beside a framed photograph.         */
/* ------------------------------------------------------------------------ */

export function WhyRawdah() {
  return (
    <section className={`bg-canvas ${pad} ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Heading className={h2}>{whyRawdah.headline}</Heading>
          <div className="mt-8 max-w-[30rem]">
            <Framed src={whyRawdah.photo.src} alt={whyRawdah.photo.alt} caption={whyRawdah.photo.caption} className="aspect-[4/3] lg:aspect-[4/5]" position="object-[50%_35%]" />
          </div>
        </div>
        <ul className="border-b border-ink/15 lg:col-span-6 lg:col-start-7 lg:self-end">
          {whyRawdah.reasons.map((r) => (
            <li key={r.title} className="grid grid-cols-[1.1rem_1fr] gap-3 border-t border-ink/15 py-5">
              <Square className="mt-[0.7em] size-[9px] bg-gold" />
              <div>
                <h3 className="display text-[1.7rem]">
                  {r.title}
                  <Mark s={r.status} />
                </h3>
                <p className="mt-1.5 max-w-[36rem] text-[0.98rem] leading-[1.65] text-ink/72">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* What Rawdah means: a sand pause.                                          */
/* ------------------------------------------------------------------------ */

export function Meaning() {
  return (
    <section className={`bg-canvas-warm py-[clamp(3rem,6vw,5rem)] ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-3 lg:grid-cols-12 lg:items-center">
        <p lang="ar" aria-hidden className="ar text-left text-[clamp(5rem,12vw,10rem)] leading-[1.1] text-bronze lg:col-span-4">
          {meaning.ar}
        </p>
        <div className="lg:col-span-7 lg:col-start-6">
          <Heading className="text-[clamp(2rem,3.4vw,3.1rem)]">{meaning.title}</Heading>
          <p className="mt-3 max-w-[38rem] font-editorial text-[clamp(1.3rem,1.8vw,1.6rem)] leading-[1.5] text-ink/85">{meaning.text}</p>
          <p className="mt-3 text-[0.84rem] text-ink/55">{meaning.source}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* What the price covers, and the hotels as a table.                         */
/* ------------------------------------------------------------------------ */

export function StayTable() {
  return (
    <div>
      <div className="border-t-2 border-ink">
        {stay.hotels.map((h) => (
          <div key={h.city} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-ink/15 py-4 lg:grid-cols-[9rem_1.5fr_1.3fr_1fr_6rem] lg:items-baseline">
            <p className="display text-[1.9rem] leading-none">{h.city}</p>
            <p className="text-right text-[0.92rem] lg:order-last">{h.nights} nights</p>
            <p className="col-span-2 text-[1rem] font-medium lg:col-span-1">
              {h.name} <span className="text-gold">{"★".repeat(h.stars)}</span>
              <Mark s={h.status} />
            </p>
            <p className="col-span-2 text-[0.9rem] text-ink/65 lg:col-span-1">{h.walk}</p>
            <p className="col-span-2 text-[0.9rem] text-ink/65 lg:col-span-1">{h.board}</p>
          </div>
        ))}
        <p className="grid grid-cols-1 gap-1 py-4 text-[0.95rem] lg:grid-cols-[9rem_1fr]">
          <span className="display text-[1.9rem] leading-none">Flights</span>
          <span className="self-center">
            {stay.flights.value}
            <Mark s={stay.flights.status} />
          </span>
        </p>
      </div>
    </div>
  );
}

export function Covers() {
  return (
    <section className={`bg-canvas ${pad} ${gutter}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <Heading className={h2}>{covers.headline}</Heading>
        <p className="max-w-[26rem] text-[1rem] leading-[1.65] text-ink/70">{covers.text}</p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
        {covers.groups.map((g) => (
          <div key={g.title} className="rounded-[3px] bg-canvas-warm p-5">
            <p className="flex items-center gap-2.5 text-[0.86rem] font-medium text-bronze">
              <Square />
              {g.title}
            </p>
            <ul className="mt-4 grid gap-4">
              {g.items.map((it) => (
                <li key={it.title}>
                  <p className="text-[1rem] font-medium">
                    {it.title}
                    <Mark s={it.status} />
                  </p>
                  <p className="mt-0.5 text-[0.88rem] leading-[1.55] text-ink/65">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-14 grid grid-cols-1 gap-x-14 gap-y-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h3 className="display text-[clamp(1.9rem,2.6vw,2.5rem)]">{stay.headline}</h3>
          <p className="mt-2 text-[0.94rem] leading-[1.6] text-ink/65">{stay.text}</p>
        </div>
        <div className="lg:col-span-9">
          <StayTable />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Paying for your place: a proportional bar and the stages.                 */
/* ------------------------------------------------------------------------ */

export function PaymentPlan({ tone = "ink" }: { tone?: "ink" | "canvas" }) {
  const { price, deposit, instalments, room } = paying.example;
  const each = Math.ceil((price - deposit) / instalments);
  const last = price - deposit - each * (instalments - 1);
  const parts = [deposit, ...Array.from({ length: instalments - 1 }, () => each), last];
  const dark = tone === "ink";
  const amounts = [gbp(deposit), `${instalments} × ${gbp(each)}`, gbp(price), "Together"];
  return (
    <div className={`rounded-[3px] p-5 sm:p-7 ${dark ? `bg-ink text-canvas ${onInk}` : "bg-canvas-warm"}`}>
      <p className={`text-[0.86rem] ${dark ? "text-canvas/70" : "text-ink/65"}`}>
        Worked example: {room}, {gbp(price)} per person
        <Mark s="proposed" />
      </p>
      <div aria-hidden className="mt-5 flex h-3 gap-[3px]">
        {parts.map((p, i) => (
          <span key={i} className={i === 0 ? "bg-gold-soft" : dark ? "bg-canvas/30" : "bg-ink/25"} style={{ flex: p }} />
        ))}
      </div>
      <ol className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-4">
        {paying.stages.map((s, i) => (
          <li key={s.when} className={`border-t pt-3 ${dark ? "border-canvas/20" : "border-ink/20"}`}>
            <p className={`text-[0.8rem] ${dark ? "text-gold-soft" : "text-bronze"}`}>{s.when}</p>
            <p className="display mt-1 text-[1.65rem] leading-tight">{amounts[i]}</p>
            <p className="mt-0.5 text-[0.9rem] font-medium">{s.what}</p>
            <p className={`mt-1 text-[0.86rem] leading-[1.55] ${dark ? "text-canvas/70" : "text-ink/65"}`}>
              {s.note}
              <Mark s={s.status} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Paying() {
  return (
    <section className={`bg-canvas pb-[clamp(3.5rem,7vw,6.5rem)] ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-8 border-t border-ink/15 pt-[clamp(3rem,6vw,5rem)] lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Heading className={h2}>{paying.headline}</Heading>
          <p className="mt-4 text-[1rem] leading-[1.65] text-ink/72">{paying.text}</p>
          <p className="mt-3 text-[0.94rem] leading-[1.6] text-ink/65">
            {paying.sharing.value}
            <Mark s={paying.sharing.status} />
          </p>
          <Actions primary={{ label: "Hear about the next Umrah", href: `${routes.nextUmrah}#${anchors.form}` }} waText={say.pay} tone="canvas" className="mt-7" />
        </div>
        <div className="lg:col-span-8">
          <PaymentPlan />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* The people who will walk with you: Brother Ayuub, then the teachers.      */
/* ------------------------------------------------------------------------ */

export function TeacherList({ list = teachers, tone = "ink" }: { list?: typeof teachers; tone?: "ink" | "canvas" }) {
  const dark = tone === "ink";
  return (
    <ul className={`border-b ${dark ? "border-canvas/15" : "border-ink/15"}`}>
      {list.map((t) => (
        <li key={t.name} className={`grid grid-cols-[6.5rem_1fr] gap-5 border-t py-6 sm:grid-cols-[8.5rem_1fr] ${dark ? "border-canvas/15" : "border-ink/15"}`}>
          <div className={`relative aspect-square overflow-hidden ${dark ? "bg-canvas/5" : "bg-ink/5"}`}>
            <Image src={t.photo.src} alt={t.photo.alt} fill sizes="9rem" className={`object-cover ${t.photo.position}`} />
          </div>
          <div>
            <p className="display text-[1.65rem] leading-tight">{t.name}</p>
            <p className={`mt-1 text-[0.84rem] font-medium ${dark ? "text-gold-soft" : "text-bronze"}`}>{t.role}</p>
            <p className={`mt-2 text-[0.93rem] leading-[1.6] ${dark ? "text-canvas/72" : "text-ink/70"}`}>
              {t.bio.value}
              <Mark s={t.bio.status} />
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function People({ link = true }: { link?: boolean }) {
  return (
    <section id={link ? "people" : "team"} className={`scroll-mt-24 bg-ink text-canvas ${onInk} ${pad} ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Heading className={h2}>{people.headline}</Heading>
          <p className="mt-4 max-w-[28rem] text-[1rem] leading-[1.65] text-canvas/75">{people.text}</p>
          <div className="mt-9 max-w-[17rem] sm:max-w-[24rem]">
            <Framed src={leader.photo.src} alt={leader.photo.alt} className="aspect-square" position="object-[50%_20%]" />
          </div>
          <p className="display mt-5 text-[1.9rem] leading-tight">{leader.name}</p>
          <p className="mt-1 text-[0.86rem] font-medium text-gold-soft">{leader.role}</p>
          <p className="mt-2 max-w-[28rem] text-[0.95rem] leading-[1.65] text-canvas/75">
            {leader.line} {leader.bio.value}
            <Mark s={leader.bio.status} />
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
          <TeacherList />
          {link ? (
            <TileLink href="/about#team" tone="line-canvas" className="mt-7 w-full sm:w-auto">
              More about the team
            </TileLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Masjids & groups, and private Umrah.                                      */
/* ------------------------------------------------------------------------ */

export function GroupsBand() {
  return (
    <section className={`bg-canvas-warm ${pad} ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:order-2 lg:col-span-6 lg:col-start-7">
          <Framed src={groupsBand.photo.src} alt={groupsBand.photo.alt} className="aspect-[4/3]" position={groupsBand.photo.position} offset="bg-ink" />
        </div>
        <div className="lg:order-1 lg:col-span-5">
          <Label>Masjids & groups</Label>
          <Heading className="mt-4 text-[clamp(2.3rem,4vw,3.9rem)]">{groupsBand.headline}</Heading>
          <p className="mt-4 text-[1rem] leading-[1.65] text-ink/75">
            {groupsBand.text.value}
            <Mark s={groupsBand.text.status} />
          </p>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {groupsBand.who.map((w) => (
              <li key={w} className="rounded-[2px] border border-ink/15 bg-canvas px-2.5 py-1.5 text-[0.82rem]">
                {w}
              </li>
            ))}
          </ul>
          <Actions primary={{ label: "Plan a group trip", href: `${routes.groups}#start` }} waText={say.group} tone="canvas" className="mt-8" />
        </div>
      </div>
    </section>
  );
}

export function PrivateBand() {
  return (
    <section className={`bg-canvas ${pad} ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <Label>Private & family</Label>
          <Heading className="mt-4 text-[clamp(2.3rem,4vw,3.9rem)]">{privateBand.headline}</Heading>
          <p className="mt-4 text-[1rem] leading-[1.65] text-ink/75">
            {privateBand.text.value}
            <Mark s={privateBand.text.status} />
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="border-t-2 border-ink">
            {privateBand.points.map((p) => (
              <li key={p.value} className="flex items-start gap-3 border-b border-ink/15 py-3.5 text-[1rem]">
                <Square className="mt-[0.5em] bg-gold" />
                <span>
                  {p.value}
                  <Mark s={p.status} />
                </span>
              </li>
            ))}
          </ul>
          <Actions primary={{ label: "Plan a private Umrah", href: routes.private }} waText={say.private} tone="canvas" className="mt-6" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* What travellers said, on clay.                                            */
/* ------------------------------------------------------------------------ */

export function Reviews() {
  const [first, ...rest] = reviews.items;
  return (
    <section className={`bg-clay text-canvas ${onInk} ${pad} ${gutter}`}>
      <Heading className="text-[clamp(2.2rem,3.8vw,3.6rem)]">{reviews.headline}</Heading>
      <div className="mt-10 grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
        <figure className="lg:col-span-7">
          <span aria-hidden className="display block h-[0.55em] text-[5.5rem] leading-[0.9] text-gold-soft">
            “
          </span>
          <blockquote className="font-editorial text-[clamp(1.6rem,2.6vw,2.35rem)] leading-[1.3]">{first.quote}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-2.5 text-[0.9rem] text-canvas/70">
            <Square className="bg-gold-soft" />
            {first.who}, a previous trip
            <Mark s={first.status} />
          </figcaption>
        </figure>
        <div className="grid content-start gap-8 lg:col-span-4 lg:col-start-9">
          {rest.map((r) => (
            <figure key={r.who} className="border-t border-canvas/20 pt-6">
              <blockquote className="font-editorial text-[1.35rem] leading-[1.4]">“{r.quote}”</blockquote>
              <figcaption className="mt-3 flex items-center gap-2.5 text-[0.86rem] text-canvas/70">
                <Square className="bg-gold-soft" />
                {r.who}, a previous trip
                <Mark s={r.status} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="mt-10 text-[0.8rem] text-canvas/55">
        {reviews.note}
        <Mark s="to confirm" />
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Common questions, grouped by topic.                                       */
/* ------------------------------------------------------------------------ */

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t-2 border-ink">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-ink/15">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4">
            <span className="text-[0.98rem] font-medium">
              {f.q}
              <Mark s={f.status} />
            </span>
            <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[2px] border border-ink/30 text-[0.85rem] leading-none group-open:border-ink group-open:bg-ink group-open:text-canvas">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <p className="pb-5 text-[0.93rem] leading-[1.65] text-ink/75">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Questions() {
  return (
    <section id="questions" className={`scroll-mt-24 bg-canvas ${pad} ${gutter}`}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <Heading className={h2}>Common questions</Heading>
        <WaTile text={say.general} label="Question? WhatsApp us" tone="line-ink" className="self-start lg:self-auto" />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-3">
        {faqTopics.map((t) => (
          <div key={t.id}>
            <p className="mb-3 flex items-center gap-2.5 text-[0.86rem] font-medium text-bronze">
              <Square />
              {t.title}
            </p>
            <FaqList items={faqs.filter((f) => f.topic === t.id)} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* The closing call, on sand-gold.                                           */
/* ------------------------------------------------------------------------ */

export function Closing() {
  return (
    <section className={`bg-gold-soft text-ink-deep ${onGold} py-[clamp(3.5rem,7vw,6rem)] ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Heading className="text-[clamp(2.6rem,5vw,5rem)]">{closing.headline}</Heading>
          <p className="mt-5 max-w-[36rem] text-[1.02rem] leading-[1.7] text-ink/80">{closing.text}</p>
        </div>
        <div className="grid gap-1.5 lg:col-span-5">
          <TileLink href={strip.href} tone="ink">
            Register for Hajj 2027
          </TileLink>
          <TileLink href={`${routes.nextUmrah}#${anchors.form}`} tone="line-ink">
            Hear about the next Umrah
          </TileLink>
          <WaTile text={say.general} label="WhatsApp us" />
        </div>
      </div>
    </section>
  );
}
