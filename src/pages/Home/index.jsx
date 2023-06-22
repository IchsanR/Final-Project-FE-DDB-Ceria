import React, { Fragment } from "react";
import { NavigasiBar } from "../../components";
import { Button, Accordion } from "flowbite-react";
import ExportCsv from "../../components/molecule/ExportCsv";

const Home = () => {
  return (
    <Fragment>
      <NavigasiBar />
        <h1 className="text-4xl font-bold mb-4 text-center">Selamat Datang di RECONCERIA</h1>
		<ExportCsv />
		<Accordion>
      <Accordion.Panel>
        <Accordion.Title>
          What is ReconCeria?
        </Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            <p>
              ReconCeria is blablabla
            </p>
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>
          Is there a Figma file available?
        </Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            <p>
              Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
              has a design equivalent in our Figma file.
            </p>
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            <p>
              Check out the
            </p>
            <a
              className="text-cyan-600 hover:underline dark:text-cyan-500"
              href="https://flowbite.com/figma/"
            >
              <p>
                Figma design system
              </p>
            </a>
            <p>
              based on the utility classes from Tailwind CSS and components from Flowbite.
            </p>
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>
          What are the differences between Flowbite and Tailwind UI?
        </Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            <p>
              The main difference is that the core components from Flowbite are open source under the MIT license, whereas
              Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
              components, whereas Tailwind UI offers sections of pages.
            </p>
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            <p>
              However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
              technical reason stopping you from using the best of two worlds.
            </p>
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Learn more about these technologies:
          </p>
          <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
            <li>
              <a
                className="text-cyan-600 hover:underline dark:text-cyan-500"
                href="https://flowbite.com/pro/"
              >
                <p>
                  Flowbite Pro
                </p>
              </a>
            </li>
            <li>
              <a
                className="text-cyan-600 hover:underline dark:text-cyan-500"
                href="https://tailwindui.com/"
                rel="nofollow"
              >
                <p>
                  Tailwind UI
                </p>
              </a>
            </li>
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
    </Fragment>
  );
}