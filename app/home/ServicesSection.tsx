"use client";

import ServiceCard from "./ServiceCard";

import { AnimatedBackground } from "@/components/motion-primitives/animated-background";

export default function ServicesSection() {
  const iconClassName = "text-primary-700 w-10 h-10";

  // Services array with icons, titles, and descriptions
  // Because the svg's are not imported, we can dynamically fill the icons using iconClassName
  const services = [
    {
      Icon: () => (
        <svg
          className={iconClassName}
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 4.17632C11.2214 3.99352 11.4514 3.78582 11.689 3.55032C13.9947 1.2656 17.1348 1.71292 18.606 3.55032L18.6199 3.56767C19.2499 4.35428 20.4545 5.85823 19.8213 9.5M11 4.17632C12.4967 5.41228 13.5 5.5 14 5M11 4.17632C10.7786 3.99352 10.5486 3.78582 10.311 3.55032C8.0053 1.2656 4.86519 1.71292 3.39399 3.55032C2.37784 4.8194 -0.222479 7.97857 6.14215 19.2396C6.40566 19.7058 6.9306 20 7.49601 20C8.39799 20 9.10296 19.2801 9.13229 18.4399C9.17779 17.1365 9.42981 15.6853 10.1334 15"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M15.7227 16.7216L17.0003 18L19 15.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M22 13.8C22 18.2998 21.2898 20.65 17.5 22C13.7102 20.65 13 18.2998 13 13.8L17.5 12L22 13.8Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
      title: "Algemene Tandheelkunde",
      description: "Persoonlijke zorg voor een gezonde en stralende glimlach.",
    },
    {
      Icon: () => (
        <svg
          className={iconClassName}
          fill="currentColor"
          height="24"
          id="Layer_1"
          stroke="#000000"
          strokeWidth="7.67997"
          version="1.1"
          viewBox="0 0 511.998 511.998"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <g>
                  <path
                    d="M292.749,16.905c-23.012,11.931-50.491,11.928-73.501,0C119.821-34.64,0.538,37.98,0.538,150.02 c0,70.51,58.455,361.978,149.849,361.978c32.059,0,61.235-32.705,89.198-99.983c6.045-14.544,26.783-14.548,32.828,0 c27.963,67.278,57.138,99.983,89.198,99.983c90.498,0,149.849-289.225,149.849-361.978 C511.458,38.017,392.217-34.662,292.749,16.905z M361.609,485.317c-18.961,0-42.491-30.449-64.556-83.543 c-15.163-36.478-66.94-36.496-82.109,0.002c-22.064,53.091-45.595,83.541-64.556,83.541 c-58.446,0-123.166-252.499-123.166-335.295c0-92.19,98.156-151.721,179.746-109.427c30.702,15.916,67.36,15.916,98.062,0 c81.506-42.253,179.744,17.15,179.744,109.427C484.775,232.462,420.098,485.317,361.609,485.317z"
                    stroke="currentColor"
                  />
                  <path
                    d="M435.855,136.679c-7.368,0-13.342,5.972-13.342,13.342c0,22.275-9.158,85.64-29.516,156.764 c-2.028,7.082,2.071,14.47,9.154,16.496c7.053,2.028,14.464-2.049,16.497-9.154c21.069-73.606,30.546-140.273,30.546-164.105 C449.197,142.652,443.223,136.679,435.855,136.679z"
                    stroke="currentColor"
                  />
                  <path
                    d="M150.388,62.434c-48.295,0-87.588,39.291-87.588,87.586c0,7.37,5.974,13.342,13.342,13.342s13.342-5.972,13.342-13.342 c0-33.582,27.32-60.902,60.904-60.902c7.368,0,13.342-5.972,13.342-13.342S157.756,62.434,150.388,62.434z"
                    stroke="currentColor"
                  />{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      ),
      title: "Cosmetische Tandheelkunde",
      description: "Verbeter het uiterlijk van uw tanden en glimlach.",
    },
    {
      Icon: () => (
        <svg
          className={iconClassName}
          data-src="https://cdn.hugeicons.com/icons/relieved-01-stroke-standard.svg"
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M7 9C7.20949 9.5826 7.77476 10 8.43922 10C9.10367 10 9.66894 9.5826 9.87843 9M14.1216 9C14.3311 9.5826 14.8963 10 15.5608 10C16.2252 10 16.7905 9.5826 17 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
      title: "Behandeling Angstige Patiënten",
      description: "Comfortabele zorg voor patiënten met tandartsangst.",
    },
    {
      Icon: () => (
        <svg
          className={iconClassName}
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9766 5.17632C12.1974 4.99352 12.4268 4.78582 12.6639 4.55032C14.9635 2.2656 18.0955 2.71292 19.5629 4.55032C23.1682 9.06434 19.1305 16.1442 16.8219 20.2396C16.559 20.7058 16.0355 21 15.4715 21C14.5719 21 13.8687 20.2801 13.8395 19.4399C13.7789 17.7005 13.3749 15.5947 12 15.5C10.6251 15.5947 10.1743 17.7005 10.1138 19.4399C10.0845 20.2801 9.38138 21 8.48173 21C7.9178 21 7.39422 20.7058 7.13139 20.2396C3.84385 14.4077 2.95445 10.7488 3.00177 8.4C5 8.5 5.99221 7.5 5.99221 5.7C8 6 9 4.82865 9 3C10 3 10.5745 3.84009 11.2894 4.55032C11.5264 4.78582 11.7558 4.99352 11.9766 5.17632ZM11.9766 5.17632C13.4694 6.41228 14.5 6.5 15 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
      title: "Restauratieve Tandheelkunde",
      description: "Herstel beschadigde tanden met moderne technieken.",
    },
    {
      Icon: () => (
        <svg
          className={iconClassName}
          fill="currentColor"
          height="24"
          id="Capa_1"
          version="1.1"
          viewBox="0 0 380.72 380.72"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              <path
                d="M299.774,28.738c-36.9-43.07-99.764-9.469-108.687-4.38c-28.64-19.56-68.672-36.796-100.902-12.241 C67.029,29.761,53.697,52.534,50.542,79.779c-4.247,36.75,11.613,72.477,22.592,88.801h0.396c0,5.211-0.146,11.41-0.146,11.41 h18.212h82.8v25.195h-67.365c1.545,7.238,3.375,15.336,5.496,23.957h61.869v25.213h-55.183c2.405,8.436,5.054,17.092,7.947,25.701 h47.235v25.212h-37.981c3.724,9.167,7.773,18.009,12.112,26.235h25.869v25.201h-20.193c11.683,14.65,25.021,24.016,40.096,24.016 c0.117,0,0.238-0.023,0.355-0.023c0.121,0,0.227,0.023,0.359,0.023c15.087,0,28.402-9.365,40.091-24.027h-20.193v-25.201h25.863 c4.345-8.215,8.389-17.068,12.118-26.246h-37.981v-25.189h47.241c2.882-8.621,5.542-17.266,7.947-25.701h-55.2v-25.213h61.881 c2.114-8.644,3.95-16.719,5.495-23.957H214.9V179.99h82.795h13.338c0,0,0.163-6.53,0.163-11.41h0.313 c10.003-14.535,16.533-31.231,18.624-48.781C332.783,97.503,329.681,63.624,299.774,28.738z M309.372,117.325 c-1.487,12.484-5.81,24.428-12.374,35.135H87.734c-8.284-14.326-19.653-42.286-16.417-70.275 c2.475-21.396,13.083-39.37,31.551-53.435c40.747-31.062,109.396,40.427,110.081,41.153c3.985,4.2,10.619,4.369,14.779,0.407 c4.194-3.962,4.368-10.579,0.418-14.779c-0.941-0.988-7.854-8.209-18.531-17.132c16.719-7.674,53.445-20.379,74.301,3.95 C303.667,65.396,312.462,91.316,309.372,117.325z"
                stroke="currentColor"
              />{" "}
            </g>{" "}
          </g>
        </svg>
      ),
      title: "Kroon en Brugwerk",
      description:
        "Duurzame oplossingen voor ontbrekende of beschadigde tanden.",
    },
    {
      Icon: () => (
        <svg
          className={iconClassName}
          color="#000000"
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 3.5H4.5C3.94772 3.5 3.5 3.94772 3.5 4.5V8C3.5 11.0376 5.96243 13.5 9 13.5C12.0376 13.5 14.5 11.0376 14.5 8V4.5C14.5 3.94772 14.0523 3.5 13.5 3.5H11.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M18.5 15.5V16.75C18.5 19.3734 16.3734 21.5 13.75 21.5C11.1266 21.5 9 19.3734 9 16.75V13.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M11.5 2.5V4.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M6.5 2.5V4.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M20.5 13.5C20.5 14.6046 19.6046 15.5 18.5 15.5C17.3954 15.5 16.5 14.6046 16.5 13.5C16.5 12.3954 17.3954 11.5 18.5 11.5C19.6046 11.5 20.5 12.3954 20.5 13.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
      title: "Wortelkanaalbehandeling",
      description:
        "Effectieve behandelingen om pijn te verlichten en tanden te redden.",
    },
    {
      Icon: () => (
        <svg
          className={iconClassName}
          fill="currentColor"
          height="24"
          id="Capa_1"
          version="1.1"
          viewBox="0 0 403.647 403.647"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                <path d="M124.149,306.024c9.399,13.524,17.334,19.823,24.969,19.823c2.879,0,9.97-1.094,13.638-11.241 c3.023-8.362,5.729-17.91,8.592-28.019c6.969-24.6,16.515-58.291,29.998-58.291h0.957c5.804,0,11.184,5.359,16.446,16.385 c5.529,11.578,9.77,27.111,13.87,42.135c2.742,10.044,5.332,19.531,8.265,27.757c3.599,10.101,10.627,11.194,13.486,11.196 c7.606,0,15.537-6.395,24.954-20.122c7.482-10.905,15.357-25.708,22.777-42.808c16.646-38.359,26.584-77.285,26.584-104.125 c0-19.684-6.971-38.33-19.631-52.505c-13.352-14.946-31.728-23.178-51.744-23.178c-15.719,0-32.351,9.175-44.498,15.876 c-3.248,1.793-9.15,5.05-10.985,5.578c-1.851-0.534-7.712-3.777-10.94-5.564c-12.121-6.706-28.719-15.89-44.549-15.89 c-20.017,0-38.393,8.232-51.743,23.178c-12.661,14.175-19.634,32.822-19.634,52.505c0,27.63,9.888,66.849,26.451,104.91 C108.791,280.576,116.653,295.237,124.149,306.024z M146.338,97.6c9.202,0,21.379,4.246,32.571,11.358 c1.614,1.026,3.964,2.833,6.237,4.581c0.918,0.705,1.822,1.4,2.667,2.036c2.756,2.064,6.479,4.762,10.846,7.33 c2.31,1.365,4.414,2.576,6.778,3.579c9.515,4.04,19.603,6.087,29.981,6.087c10.612,0,15.996-1.187,18.013-1.667 c3.782-0.902,12.638-3.308,12.465-4.616c-0.153-1.155-9.903-0.581-13.196-0.866c-3.82-0.332-15.516-1.051-29.567-4.772 c-4.219-1.118-9.933-3.373-10.19-4.619c-0.195-0.941,3.885-3.556,6.989-5.46c10.873-6.671,25.408-12.97,37.378-12.97 c35.56,0,56.81,31.074,56.81,61.116c0,24.573-9.726,62.249-25.38,98.327c-6.959,16.034-14.567,30.37-21.427,40.365 c-6.63,9.663-10.519,13.98-12.212,13.458c-0.32-0.099-0.744-0.554-0.919-1.046c-2.734-7.67-4.826-17.008-7.51-26.84 c-4.271-15.641-8.686-31.812-14.777-44.574c-7.928-16.604-17.608-24.675-29.592-24.675h-0.957 c-11.576,0-21.045,8.008-28.948,24.481c-6.066,12.643-10.638,28.781-15.079,44.455c-2.786,9.836-4.879,19.043-7.72,26.902 c-0.203,0.561-0.771,1.307-1.126,1.421c-1.676,0.536-5.612-3.569-12.361-13.278c-6.862-9.875-14.441-24.045-21.342-39.899 c-15.569-35.777-25.241-73.748-25.241-99.097C89.528,128.673,110.778,97.6,146.338,97.6z" />
                <path d="M397.808,142.451c0,0-11.247,3.112-14.979,4.207c-1.688,0.495-1.813-0.472-1.813-0.472 c-8.279-36.051-26.914-68.029-54.498-93.572C292.13,20.772,247.367,3.236,200.473,3.236c-46.972,0-91.79,17.587-126.199,49.521 C40.052,84.518,19.179,127.55,15.5,173.929c-0.437,5.506,3.672,10.323,9.178,10.76c0.269,0.021,0.537,0.032,0.802,0.032 c5.164,0,9.542-3.973,9.958-9.209c6.774-85.388,79.267-152.275,165.036-152.275c77.828,0,144.605,54.257,161.324,128.329 c0,0,0.354,0.88-0.401,1.112c-5.027,1.548-20.255,5.688-20.255,5.688c-4.48,1.258-5.213,4.715-1.628,7.681l38.234,31.643 c3.586,2.966,7.76,1.794,9.275-2.605l16.172-46.92C404.712,143.764,402.288,141.194,397.808,142.451z" />
                <path d="M379.694,218.959c-5.513-0.44-10.322,3.672-10.76,9.178c-6.774,85.389-79.267,152.274-165.035,152.274 c-77.855,0-144.633-54.208-161.321-128.317c0,0-0.23-1.024,0.54-1.246c5.72-1.647,19.389-5.444,19.389-5.444 c4.481-1.258,5.213-4.715,1.628-7.683L25.9,206.08c-3.585-2.967-7.758-1.795-9.275,2.604l-16.173,46.92 c-1.517,4.397,0.909,6.969,5.388,5.711c0,0,10.842-3.06,16.504-4.634c0.689-0.192,0.99,1.078,0.99,1.078 c8.269,36.082,26.917,67.713,54.521,93.274c34.388,31.841,79.15,49.377,126.043,49.377c46.972,0,91.79-17.586,126.198-49.52 c34.223-31.761,55.095-74.793,58.773-121.173C389.309,224.213,385.199,219.396,379.694,218.959z" />{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      ),
      title: "Prothetische Behandelingen",
      description:
        "Comfortabele en natuurlijke vervangingen voor ontbrekende tanden.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container flex flex-col mx-auto items-start gap-4 md:gap-8 px-4 md:px-6">
        {/* Small header, Title and Description */}
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base font-semibold uppercase tracking-wide text-primary-800">
            Diensten
          </p>

          <div className="flex flex-col gap-4 md:gap-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-navy-900">
              Voel je goed over je mondgezondheid
            </h2>
            <p className=" max-w-[700px] text-gray-600 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              Wij bieden uitgebreide tandheelkundige zorg met een focus op
              comfort en duurzame resultaten. Ons ervaren team maakt gebruik van
              de nieuwste technologie om de best mogelijke behandeling te
              garanderen.
            </p>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
          <AnimatedBackground
            enableHover
            className="rounded-lg bg-zinc-100 dark:bg-zinc-800 "
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6,
            }}
          >
            {services.map((service, index) => (
              <div key={index} data-id={`card-${index}`}>
                <div className="flex select-none flex-col space-y-1 p-4">
                  <ServiceCard
                    key={index}
                    Icon={service.Icon}
                    description={service.description}
                    title={service.title}
                  />
                </div>
              </div>
            ))}
          </AnimatedBackground>
        </div>
      </div>
    </section>
  );
}
