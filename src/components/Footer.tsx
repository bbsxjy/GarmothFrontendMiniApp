import React from "react";

const Footer: React.FC = () => (
  <div className="mt-10 h-12 w-full bg-700 flex justify-center items-center pt-4">
    <div className="container-lg dcc h-full text-sm">
      <div className="flex items-center gap-6">
        <p className="text-200 hover:text-white">
          <span data-ccpa-link="1"></span>
        </p>
        <div id="consent-box" className="text-200 hover:text-white">
          <div className="cursor-pointer">更新 Cookie 首选项</div>
        </div>
        <a href="/privacy" className="text-200 hover:text-white">隐私政策</a>
        <a href="/terms-of-service" className="text-200 hover:text-white">《服务条款》</a>
        <a href="https://discord.gg/zMnbhBV5rH" rel="noopener noreferrer" target="_blank" className="text-200 hover:text-white">Discord</a>
      </div>
    </div>
  </div>
);

export default Footer;