import React from 'react';

interface LinkItemProps {
  href: string;
  target?: string;
  imgSrc: string;
  imgAlt: string;
  mainText: string;
  subText?: string;
  type: 'icon' | 'simple' | 'complex' | 'placeholder';
}

const LinkItem: React.FC<LinkItemProps> = ({ href, target = '_self', imgSrc, imgAlt, mainText, subText, type }) => {
  const baseClass = "cut-select-none cursor-pointer rounded-md border-2 border-600 bg-600 p-1 pr-3 opacity-75 border-2 border-transparent hover:border-gray-100";
  const flexClass = "cut-text flex items-center gap-1";
  const imgClass = "size-8 rounded-full bg-500 p-1 opacity-75";
  const mainTextClass = "cut-text text-sm font-semibold";

  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={`${baseClass} ${type === 'complex' ? 'col-span-2 p-0.5' : ''}`}
    >
      <div className={flexClass}>
        <div className="flex-none">
          <img src={imgSrc} loading="lazy" alt={imgAlt} className={imgClass} />
        </div>
        <div>
          <p className={mainTextClass}>{mainText}</p>
          {subText && <p className="text-xs text-200">{subText}</p>}
        </div>
      </div>
    </a>
  );
};

const Bottom: React.FC = () => (
  <div className="container mx-auto max-w-screen-xl mt-3 border-t-2 border-400 border-opacity-50 pt-3 mb-3 ">
    <div className="grid grid-cols-7 gap-2">
      <LinkItem
        href="https://discord.gg/zMnbhBV5rH"
        target="_blank"
        imgSrc="https://assets.garmoth.com/icons/menu/discord.png"
        imgAlt="discord"
        mainText="Discord"
        type="icon"
      />
      <LinkItem
        href="/terms-of-service"
        imgSrc="https://assets.garmoth.com/icons/menu/rules.png"
        imgAlt="rules"
        mainText="规定"
        type="simple"
      />
      <LinkItem
        href="/privacy"
        imgSrc="https://assets.garmoth.com/icons/menu/privacy.png"
        imgAlt="privacy"
        mainText="隐私保护指引"
        type="simple"
      />
      <LinkItem
        href="/settings"
        imgSrc="https://assets.garmoth.com/icons/menu/settings.png"
        imgAlt="settings"
        mainText="设置"
        type="simple"
      />
      <LinkItem
        href="https://questlog.gg/throne-and-liberty"
        imgSrc="https://assets.garmoth.com/icons/menu/questlog.png"
        imgAlt="questlog.gg logo"
        mainText="Questlog.gg - Throne And Liberty"
        subText="Database, Skill Builder & Character Builder"
        type="complex"
      />
      <LinkItem
        href="#"
        imgSrc="https://via.placeholder.com/64"
        imgAlt="placeholder"
        mainText="置顶设置"
        type="placeholder"
      />
    </div>
  </div>
);

export default Bottom;
