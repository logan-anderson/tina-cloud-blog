// NAVIGATION
/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react';
import { LoginIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { usePrefix } from '../PrefixProvider';

const LoginButton = () => {
  const { prefix, setPrefix } = usePrefix();
  const { push, asPath } = useRouter();

  return (
    <button
      type="button"
      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      onClick={() => {
        if (prefix === ``) {
          // If we are not at an admin route then go to the admin route
          setPrefix(`/admin`);
          push(`/admin${asPath}`);
        } else {
          // If we are in an admin route then go to the non-admin route
          setPrefix(``);
          push(asPath.replace(`/admin`, ``));
          // edge case for when the path is only '/admin' we want to go back to the home page ('/') and not '' (empty string)
          if (asPath === `/admin`) {
            push(`/`);
          }
        }
      }}
    >
      <span className="sr-only">View notifications</span>
      <LoginIcon className="h-6 w-6 inline" aria-hidden="true" />
      <span className="ml-3 relative">
        {prefix === `` && (
          <>
            Login <span className="hidden sm:inline">with Tina Cloud</span>
          </>
        )}
        {prefix === `/admin` && <>Logout</>}
      </span>
    </button>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(` `);
}

export function Nav() {
  const router = useRouter();
  const { prefix } = usePrefix();
  const navigation = [
    {
      name: `Home`,
      href: `${prefix}/`,
      current: router.pathname === `/` || router.pathname === `/admin`,
    },
    {
      name: `Blog`,
      href: `${prefix}/blog`,
      current: router.pathname.includes(`/blog`),
    },
  ];
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/">
                  <a className="text-white hover:curser-pointer ">
                    <div className="flex-shrink-0 flex items-center">
                      <svg
                        viewBox="0 0 49 68"
                        fill="inherit"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-labelledby="title desc"
                        className="fill-current h-8 w-auto"
                      >
                        <title>Tina</title>
                        <desc>A proud llama</desc>
                        <path d="M31.4615 30.1782C34.763 27.4475 36.2259 11.3098 37.6551 5.50906C39.0843 -0.291715 44.995 0.00249541 44.995 0.00249541C44.995 0.00249541 43.4605 2.67299 44.0864 4.66584C44.7123 6.65869 49 8.44005 49 8.44005L48.0752 10.8781C48.0752 10.8781 46.1441 10.631 44.995 12.9297C43.8459 15.2283 45.7336 37.9882 45.7336 37.9882C45.7336 37.9882 38.8271 51.6106 38.8271 57.3621C38.8271 63.1136 41.5495 67.9338 41.5495 67.9338H37.7293C37.7293 67.9338 32.1252 61.2648 30.9759 57.9318C29.8266 54.5988 30.2861 51.2658 30.2861 51.2658C30.2861 51.2658 24.1946 50.921 18.7931 51.2658C13.3915 51.6106 9.78922 56.2539 9.13908 58.8512C8.48894 61.4486 8.21963 67.9338 8.21963 67.9338H5.19906C3.36057 62.2603 1.90043 60.2269 2.69255 57.3621C4.88665 49.4269 4.45567 44.9263 3.94765 42.9217C3.43964 40.9172 0 39.1676 0 39.1676C1.68492 35.7349 3.4048 34.0854 10.8029 33.9133C18.201 33.7413 28.1599 32.9088 31.4615 30.1782Z" />
                        <path d="M12.25 57.03C12.25 57.03 13.0305 64.2533 17.1773 67.9342H20.7309C17.1773 63.9085 16.7897 53.415 16.7897 53.415C14.9822 54.0035 12.4799 56.1106 12.25 57.03Z" />
                      </svg>
                    </div>
                  </a>
                  {/* <a className="hover:cursor-pointer">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                        alt="Workflow"
                      />
                    </div>
                  </a> */}
                </Link>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? `bg-gray-900 text-white`
                              : `text-gray-300 hover:bg-gray-700 hover:text-white`,
                            `px-3 py-2 rounded-md text-sm font-medium`,
                          )}
                          aria-current={item.current ? `page` : `false`}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <LoginButton />
                {/* Profile dropdown */}
                {/* <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/#"
                                className={classNames(
                                  active ? `bg-gray-100` : ``,
                                  `block px-4 py-2 text-sm text-gray-700`,
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/#"
                                className={classNames(
                                  active ? `bg-gray-100` : ``,
                                  `block px-4 py-2 text-sm text-gray-700`,
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/#"
                                className={classNames(
                                  active ? `bg-gray-100` : ``,
                                  `block px-4 py-2 text-sm text-gray-700`,
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} passHref>
                  <a
                    className={classNames(
                      item.current
                        ? `bg-gray-900 text-white`
                        : `text-gray-300 hover:bg-gray-700 hover:text-white`,
                      `block px-3 py-2 rounded-md text-base font-medium`,
                    )}
                    aria-current={item.current ? `page` : `false`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
