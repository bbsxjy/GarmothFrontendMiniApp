import { ArrowIcon } from '@/icons';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LeftMenuProps {
  onSelect: (menu: string) => void;
  visible: boolean;
  toggleMenu: () => void;
}

const LeftMenu: React.FC = () => {
  const [isSingleHuntMenuOpen, setSingleHuntMenuOpen] = useState(false);
  const location = useLocation();

  const [activeMain, setActiveMain] = useState('hunting'); 

  
  const handleMainMenuClick = (menuKey: any) => {
    setActiveMain(menuKey);
  };
  

 

  const [activeMenu, setActiveMenu] = useState("/grind-tracker/user-info/summary");
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedData = [
    {
      href: "/grind-tracker/user-info/spot/146",
      icon: "https://assets.garmoth.com/img/new_icon/03_etc/04_dropitem/00044520.webp",
      title: "[德希亚] 荆棘森林",
      lanternIcon: "https://assets.garmoth.com/icons/lantern.png",
    },
    {
      href: "/grind-tracker/user-info/spot/7",
      icon: "https://assets.garmoth.com/img/new_icon/03_etc/04_dropitem/00044451.webp",
      title: "荆棘森林",
      lanternIcon: null,
    },
    {
      href: "/grind-tracker/user-info/spot/8",
      icon: "https://assets.garmoth.com/img/new_icon/03_etc/04_dropitem/00044450.webp",
      title: "念头之墓",
      lanternIcon: null,
    },
  ];

  const handleMenuClick = (menuHref: any) => {
    setActiveMenu(menuHref);
  };

  const toggleSingleHuntMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      id="grind-menu"
      className="hidden-scroll-bar fixed z-30 flex-none transition-all lg:relative w-full lg:w-72"
    >
      <div className="block flex w-full select-none justify-between bg-700 px-2 py-1 lg:hidden">
        <div className="flex w-full items-center justify-between rounded bg-600 p-1">
          <span className="flex items-center px-1 text-base">Menu</span>
          <svg

            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="icon flex size-8 items-center justify-center rounded-md text-lg"
            width="1em"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32"
            />
          </svg>
        </div>
      </div>
      <div className="w-full lg:w-72 hidden-scroll-bar relative z-10 h-full overflow-y-auto overflow-x-hidden border-r-2 border-500 bg-700 pb-12 shadow-lg transition-all">
        <div className="flex w-full flex-col gap-2 py-2 lg:w-72">
          <div className="flex w-full items-center justify-center px-2">
            <div className="w-full rounded bg-600 p-1">
              <a
                href="/grind-tracker/user/summary"
                className="router-link-active router-link-exact-active mx-auto grid grid-cols-4 gap-1"
                aria-current="page"
              >
                <button className={`cursor-pointer rounded px-0 py-1 text-center text-xs ${activeMain === 'hunting' ? 'bg-primary' : 'bg-500'}`}
                  onClick={() => handleMainMenuClick('hunting')}
                >
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="icon text-2xl"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M19.75 14.438c59.538 112.29 142.51 202.35 232.28 292.718l3.626 3.75l.063-.062c21.827 21.93 44.04 43.923 66.405 66.25c-18.856 14.813-38.974 28.2-59.938 40.312l28.532 28.53l68.717-68.717c42.337 27.636 76.286 63.646 104.094 105.81l28.064-28.06c-42.47-27.493-79.74-60.206-106.03-103.876l68.936-68.938l-28.53-28.53c-11.115 21.853-24.413 42.015-39.47 60.593c-43.852-43.8-86.462-85.842-130.125-125.47c-.224-.203-.432-.422-.656-.625C183.624 122.75 108.515 63.91 19.75 14.437zm471.875 0c-83.038 46.28-154.122 100.78-221.97 161.156l22.814 21.562l56.81-56.812l13.22 13.187l-56.438 56.44l24.594 23.186c61.802-66.92 117.6-136.92 160.97-218.72zm-329.53 125.906l200.56 200.53a403 403 0 0 1-13.405 13.032L148.875 153.53zm-76.69 113.28l-28.5 28.532l68.907 68.906c-26.29 43.673-63.53 76.414-106 103.907l28.063 28.06c27.807-42.164 61.758-78.174 104.094-105.81l68.718 68.717l28.53-28.53c-20.962-12.113-41.08-25.5-59.937-40.313c17.865-17.83 35.61-35.433 53.157-52.97l-24.843-25.655l-55.47 55.467c-4.565-4.238-9.014-8.62-13.374-13.062l55.844-55.844l-24.53-25.374c-18.28 17.856-36.602 36.06-55.158 54.594c-15.068-18.587-28.38-38.758-39.5-60.625z"
                    />
                  </svg>
                  <span>狩猎</span>
                </button>
                <button className={`cursor-pointer rounded px-0 py-1 text-center text-xs  ${activeMain === 'living' ? 'bg-primary' : ''}`}
                  onClick={() => handleMainMenuClick('living')}
                >
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="icon text-2xl"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M257.563 25.156c353.16 276.87 16.918 408.895-87.875 293.25l-40.75 37.125l50.812 50.345c217.562 181.363 524.73-252.058 77.813-380.72M110.75 364.28c-5.525 1.065-8.975 2.957-11.313 5.25c-1.956 1.922-3.248 4.556-4.25 7.564l55.188 52.844c5.468-1.008 9.264-2.796 11.28-4.688c1.997-1.872 3.095-3.864 3.095-7.53zm-24.72 30.314L30.407 445.28c-16.737 27 14.693 61.198 51.093 44.66l51.53-50.282l-47-45.062z"
                    />
                  </svg>
                  <span>生活</span>
                </button>
                <button className={`cursor-pointer rounded px-0 py-1 text-center text-xs ${activeMain === 'scrolls' ? 'bg-primary' : 'bg-500'}`}
                  onClick={() => handleMainMenuClick('scrolls')}
                >
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="icon text-2xl"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M103.432 17.844a87 87 0 0 0-3.348.08q-3.822.163-7.604.678c-20.167 2.747-39.158 13.667-52.324 33.67c-24.613 37.4 2.194 98.025 56.625 98.025c.536 0 1.058-.012 1.583-.022v.704h60.565c-10.758 31.994-30.298 66.596-52.448 101.43a283 283 0 0 0-6.29 10.406l34.878 35.733l-56.263 9.423c-32.728 85.966-27.42 182.074 48.277 182.074v-.002l9.31.066c23.83-.57 46.732-4.298 61.325-12.887c4.174-2.458 7.63-5.237 10.467-8.42h-32.446c-20.33 5.95-40.8-6.94-47.396-25.922c-8.956-25.77 7.52-52.36 31.867-60.452a55.6 55.6 0 0 1 17.565-2.834v-.406h178.33c-.57-44.403 16.35-90.125 49.184-126c23.955-26.176 42.03-60.624 51.3-94.846l-41.225-24.932l38.272-6.906l-43.37-25.807h-.005l.002-.002l.002.002l52.127-8.85c-5.232-39.134-28.84-68.113-77.37-68.113C341.14 32.26 222.11 35.29 149.34 28.496c-14.888-6.763-30.547-10.723-45.908-10.652m.464 18.703c13.137.043 27.407 3.804 41.247 10.63l.033-.07c4.667 4.735 8.542 9.737 11.68 14.985H82.92l10.574 14.78c10.608 14.83 19.803 31.99 21.09 42.024c.643 5.017-.11 7.167-1.814 8.836c-1.705 1.67-6.228 3.875-15.99 3.875c-40.587 0-56.878-44.952-41.012-69.06C66.238 46.64 79.582 39.22 95.002 37.12a64 64 0 0 1 8.894-.573M118.5 80.78h46.28c4.275 15.734 3.656 33.07-.544 51.51H131.52c1.9-5.027 2.268-10.574 1.6-15.77c-1.527-11.913-7.405-24.065-14.62-35.74m101.553 317.095c6.44 6.84 11.192 15.31 13.37 24.914c3.797 16.736 3.092 31.208-1.767 43.204c-4.526 11.175-12.576 19.79-22.29 26h237.19c14.448 0 24.887-5.678 32.2-14.318c7.312-8.64 11.2-20.514 10.705-32.352a47.7 47.7 0 0 0-2.407-13.18l-69.91-8.205l42.017-20.528c-8.32-3.442-18.64-5.537-31.375-5.537H220.053zm-42.668.506a37 37 0 0 0-3.457.153a34.8 34.8 0 0 0-7.824 1.63c-15.11 5.02-25.338 21.54-20.11 36.583c3.673 10.57 15.347 17.71 25.654 13.938l1.555-.57h43.354c.946-6.36.754-13.882-1.358-23.192c-3.71-16.358-20.543-28.483-37.815-28.54z"
                    />
                  </svg>
                  <span>卷轴</span>
                </button>
                <button className={`cursor-pointer rounded px-0 py-1 text-center text-xs ${activeMain === 'settings' ? 'bg-primary' : 'bg-500'}`}
                  onClick={() => handleMainMenuClick('settings')}
                >
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="icon text-2xl"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="m193.571 26.027l35.192 83.99c14.877 7.658 33.121 6.696 47.488-1.279l40.283-85.976c-45.582-7.268-84.512-4.945-122.963 3.265m137.3 7.606l-32.038 71.38c12.536 12.349 37.237 18.872 47.033 15.448l31.172-64.691c-12.422-8.392-27.428-15.886-46.168-22.137zm-154.86-1.97c-21.814 6.55-40.982 16.35-56.099 28.591c14.941 15.844 28.861 34.184 38.194 52.832c24.477 6.133 35.479-6.849 47.475-18.55zm-74.245 34.831c-36.541 32.91-66.523 76.42-78.068 125.215l65.957 3.353c12.006-30.53 24.552-56.284 54.231-72.755c-9.883-20.24-23.626-39.403-42.12-55.813m292.503-.29l-31.852 61.044c32.54 21.007 43.572 41.348 52.597 69l72.464-8.43c-9.612-55.894-42.206-107.047-93.209-121.614m-52.233 137.2c4.757 12.937-15.842 29.7-9.07 39.428c-4.011.85-8.874 1.642-14.385-8.957c-1.126 12.49 2.172 19.603 12.168 29.209c-2.682.783-8.045 2.75-12.08.566c-1.24 7.386 10.867 13.863 20.725 14.832l8.392-2.175c-6.09-1.106-7.881-3.315-10.627-6.13c2.97-1.32 12.554-7.117 2.149-14.751c12.634-2.752 6.035-14.89 4.14-21.862c7.525 7.798 15.243 22.54 21.862 7.084c4.176 12.604 6.561 12.12 13.614 9.107c1.054 9.196-2.957 14.791-8.792 22.518l12.494-4.992c6.018-5.026 20.16-25.502 6.428-35.5c2.603 12.443-5.563 14.388-18.672-10.937c-4.377 30.773-12.236-7.49-28.346-17.44m-321.668 2.108v66.242l72.842-11.858l1.592-49.873zm143.486.363c3.732 8.72-14.487 45.226-18.865 14.453c-13.109 25.325-23.908 24.26-21.304 11.817c-13.732 9.998-1.347 33.458 4.671 38.484l11.229 3.001c-5.835-7.727-11.565-13.614-10.512-22.81c7.053 3.013 10.492 5.604 14.668-7c6.618 15.456 17.32-4.378 24.846-12.175c-1.554 11.494-6.282 22.427 7.303 25.197c-9.13 10.082 1.899 19.99-12.694 22.812l8.393 2.176c9.857-.97 20.385-10.606 19.144-17.992c-4.035 2.183-7.818 3.376-10.5 2.594c9.996-9.607 10.662-21.46 9.536-33.95c-5.511 10.6-7.917 11.738-11.752 13.698c6.77-9.728-5.927-32.285-14.163-40.305m327.512 1.172l-77.57 5.687l1.156 79.192l75.524 2.842zM98.313 279.81l-79.955 9.779l1.202 99.754l83.54 1.152zm280.659 7.347l-28.332 7.031l21.455 68.315l16.125-5.043zm-246.961 3.348l-9.248 70.303l16.125 5.043l21.455-68.315zM412.269 310.3v83.58l79.166-8.031l2.289-75.55zm84.605 91.656l-88.934 9.947l-1.16 80.727l90.674.586zm-395.822 2.002l-81.848 2.322l-4.658 86.184h90z"
                    />
                  </svg>
                  <span>副本</span>
                </button>
              </a>
            </div>
          </div>

          <div>
            <a
              href="/grind-tracker/user/summary"
              className="flex cursor-pointer items-center gap-2 py-2 hover:bg-600 00"
              aria-current="page"
            >
              <svg

                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="icon w-14 text-center text-xl text-100"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M32 32c17.7 0 32 14.3 32 32v336c0 8.8 7.2 16 16 16h400c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64c0-17.7 14.3-32 32-32m128 192c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32v-64c0-17.7 14.3-32 32-32m128-64v160c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32m64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32v-96c0-17.7 14.3-32 32-32m128-96v224c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32"
                />
              </svg>
              <div className="cut-text">摘要</div>
            </a>
            <a
              href="/grind-tracker/global"
              className="flex cursor-pointer items-center gap-2 py-2 hover:bg-600 border-r-4 border-primary bg-800"
            >
              <svg

                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="icon w-14 text-center text-xl text-100"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="m57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8l57.9 16.5c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5.3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3c-92.8 0-171.5 60.9-198.2 145M464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0a256 256 0 1 1-512 0"
                />
              </svg>
              <div className="cut-text">全球数据</div>
            </a>
            <a
              href="/grind-tracker/best-grind-spots"
              className="flex cursor-pointer items-center gap-2 py-2 hover:bg-600 "
            >
              <svg

                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="icon w-14 text-center text-xl text-100"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2h144c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48h-97.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7M32 192h64c17.7 0 32 14.3 32 32v224c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32"
                />
              </svg>
              <div className="cut-text">最佳狩猎点</div>
            </a>
            <a
              href="/grind-tracker/monster-ap-caps"
              className="flex cursor-pointer items-center gap-2 py-2 hover:bg-600"
            >
              <svg

                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="icon w-14 text-center text-xl text-100"
                width="1em"
                height="1em"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L9.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 109.3V160c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32zm416 80a48 48 0 1 0-96 0a48 48 0 1 0 96 0M448 208a48 48 0 1 0-96 0a48 48 0 1 0 96 0m-48 176a48 48 0 1 0 0-96a48 48 0 1 0 0 96m48 80a48 48 0 1 0-96 0a48 48 0 1 0 96 0m128 0a48 48 0 1 0-96 0a48 48 0 1 0 96 0m-304-80a48 48 0 1 0 0-96a48 48 0 1 0 0 96m48 80a48 48 0 1 0-96 0a48 48 0 1 0 96 0m-176 48a48 48 0 1 0 0-96a48 48 0 1 0 0 96m432-176a48 48 0 1 0-96 0a48 48 0 1 0 96 0m-48-80a48 48 0 1 0 0-96a48 48 0 1 0 0 96"
                />
              </svg>
              <div className="cut-text">刷怪循环攻击力上限</div>
            </a>
            <a
              href="/grind-tracker/custom-prices"
              className="flex cursor-pointer items-center gap-2 py-2 hover:bg-600"
            >
              <svg

                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="icon w-14 text-center text-xl text-100"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M320 96H192l-47.4-71.1c-7.1-10.7.5-24.9 13.3-24.9h196.2c12.8 0 20.4 14.2 13.3 24.9zm-128 32h128c3.8 2.5 8.1 5.3 13 8.4c56.7 36.3 179 114.5 179 279.6c0 53-43 96-96 96H96c-53 0-96-43-96-96c0-165.1 122.3-243.3 179-279.6c4.8-3.1 9.2-5.9 13-8.4m84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7.5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5q-3.45-1.2-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9.6 4 1.3 6.1 2.1c8.3 2.9 17.9 6.2 28.2 8.4v14.6c0 11 9 20 20 20s20-9 20-20V410c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6.1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7v-13.9z"
                />
              </svg>
              <div className="cut-text">自定义价格</div>
            </a>
            <div className="flex items-center py-1">
              <svg

                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="icon w-14 flex-none text-center text-xl text-100"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208M208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288"
                />
              </svg>
              <div className="w-full pr-2">
                <input
                  type="text"
                  placeholder="查找猎场"
                  className="h-9 w-full border-500 bg-700 px-2 py-0 text-sm placeholder:font-normal placeholder:text-400"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">

            <div className="w-full lg:w-72 px-1">
              <div className="rounded-md border-2 border-500 pb-1">
                <div className="to-0/600 flex cursor-pointer select-none items-center justify-between rounded-t-md from-500/40 py-1 font-bold hover:bg-gradient-to-b" onClick={toggleSingleHuntMenu}>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="icon w-11 text-center"
                      width="1em"
                      height="1em"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256m-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-98.5-79.8-178.3-178.3-178.3z"
                      />
                    </svg>
                    <div>单人猎场</div>
                  </div>
                  <ArrowIcon direction={isExpanded ? 'up' : 'down'} />
                </div>
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: isExpanded ? '500px' : '0',
                    transition: "max-height 0.3s ease-in-out"
                  }}
                >
                  <div>
                    <div className="flex flex-col gap-1 transition">
                      {expandedData.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className="mx-1 flex cursor-pointer items-center gap-1 rounded bg-600 py-0.5 pr-1 hover:bg-500"
                        >
                          <div className="flex w-9 flex-none items-center justify-center">
                            <img src={subItem.icon} loading="lazy" className="item-icon size-8" />
                          </div>
                          <span className="cut-text grow text-sm">{subItem.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="py-1 text-center text-sm italic text-200">
              记录总数: <span className="font-bold">0</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 hidden h-10 w-full border-r-2 border-500 bg-700 transition-all lg:block w-full lg:w-72">
        <div className="flex h-10 w-full justify-end bg-800 bg-opacity-25 font-bold">
          <div className="group flex cursor-pointer items-center justify-end">
            <svg

              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="icon size-10 p-3 text-green group-hover:text-white"
              width="1em"
              height="1em"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M32 32C32 14.3 46.3 0 64 0h256c17.7 0 32 14.3 32 32s-14.3 32-32 32h-29.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8S362.3 352 352 352H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64c-17.7 0-32-14.3-32-32m128 352h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LeftMenu;
