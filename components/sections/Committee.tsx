import { Reveal } from '@/components/motion/Reveal'
import { Media } from '@/components/ui/Media'
import type { CommitteeSection } from '@/types/content'

export function Committee({ data }: { data: CommitteeSection }) {
  return (
    <section className="container-page pt-section">
      <div className="grid gap-4 md:grid-cols-2 md:gap-16 my-24">
        <Reveal>
          <h2 className="type-eyebrow max-w-md">{data.title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="type-lead max-w-2xl rtl:font-normal">{data.description}</p>
        </Reveal>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 lg:gap-[3.625rem]">
        {data.members.map((member, index) => (
          <Reveal key={member.id} delay={0.24 + index * 0.12}>
            <li className="flex flex-col text-center">
              {/* 400 x 264 in the design. */}
              <Media
                asset={member.image}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[400/264] w-full rounded-card"
              />
              {/* 26px / 30px, Bold then Light, both centred. */}
              <p className="mt-5 text-center text-[clamp(1rem,2.6vw,1.625rem)] leading-[1.15] font-bold uppercase">
                {member.role}
              </p>
            <div className="flex justify-center mt-1"> 
               <p className="text-center text-[clamp(1rem,2.6vw,1.625rem)] leading-[1.15] font-light lg:max-w-[12rem]">
                {member.name}
              </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
