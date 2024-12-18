import Taro from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import { useState } from 'react'
import NavButton from './components/NavButton'
import CouponCard from './components/CouponCard'
import Footer from '@/components/Footer'
import Swoop from '@/pages/index/assets/swoop.png'
import TradeTitle from '@/pages/index/assets/info_title.png'
import Goods from '@/pages/index/assets/goods.png'
import Light from '@/pages/index/assets/light.png'
import AttackPower from '@/pages/index/assets/m4.png'
import Strength from '@/pages/index/assets/tool_title.png'
import Header from '@/components/header'
import BorderBox from '@/components/BorderBox'
import Carousel from '@/components/Carousel'
import GanttChart from '@/components/GanttChart'
import NotificationBanner from '@/components/NotificationBanner'
import Crown from '@/pages/index/assets/cron.png'

const Home: React.FC<{ isAnimating: boolean }> = () => {
  const [showBanner, setShowBanner] = useState(true)

  return (
    <View className="bg-700">
      {/* <Header /> */}
      {/* Notification Banner */}
      {showBanner && (
        <NotificationBanner
          title="【公告】"
          message="欢迎使用黑沙盒子！加入Q群935507982，反馈您宝贵的意见！"
          linkText="点击加群或扫码"
          linkHref="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=s1A1EXYM0zvNQ5aS18dfvmFF2S-PuJcr&authKey=Q12oFzXrXirrllnW5ps%2FjMK7YF67iV6yH5fZ0X%2Bs%2BXpbV9Yn14435BoSmA5YBhnk&noverify=0&group_code=935507982"
          onDismiss={() => setShowBanner(false)}

        />
      )}

      <View id="main" className="">
        <View className="p-4 relative grid grid-cols-1 gap-4 mx-auto lg:grid-cols-3">
          {/* 左侧 */}
          <View className="lg:col-span-1">
            <View className="flex flex-col items-center justify-between gap-4">
              <BorderBox leftAndRightBorderLength="[35px]">
                <View className="flex items-center justify-center gap-3 h-12">
                  <Text className="text-xl text-slate-100">黑沙工具面板</Text>
                </View>

                <View className="flex justify-center">
                  <Image src={TradeTitle} className="h-10 mx-auto mt-2 w-full" />
                </View>

                <View className="grid grid-cols-2 gap-3 mt-3 mb-3">
                  <NavButton
                    imgSrc="https://assets.garmoth.com/icons/menu/boss-timer.png"
                    title="世界王时间表"
                    description="最新Boss时间"
                    link="/pages/boss-timer/index"

                  />

                  <NavButton
                    imgSrc="https://assets.garmoth.com/icons/menu/best-grind-spots.png"
                    title="最佳打怪点"
                    description="收益最高打怪点"
                    link="/pages/grind-tracker/BestGrindSpots"
                  />

                  <NavButton
                    imgSrc={Light}
                    title="PVE/PVP排名"
                    description="最新最热职业排名"
                    link="/pages/tier-list/index"
                  />
                  <NavButton
                    imgSrc="https://assets.garmoth.com/icons/menu/beauty-album.png"
                    title="精品捏脸"
                    description="多种精品捏脸给你选"
                    link="/pages/beauty-album/index"
                  />

                  {/* <NavButton
                    imgSrc="https://assets.garmoth.com/icons/menu/central-market.png"
                    title="交易商行"
                    description="最新交易行物品行情"
                    link="/pages/market/index"
                  /> */}

                  {/* Uncomment if needed
                  <NavButton
                    imgSrc="https://assets.garmoth.com/icons/menu/mastery-brackets.png"
                    title="生活技能专精"
                    description="生活专精明细"
                    link="/pages/mastery-brackets/index"
                  />
                  */}
                  <NavButton
                    imgSrc="https://assets.garmoth.com/icons/menu/grind-timer.png"
                    title="打怪计时器"
                    description="记录同步打怪记录"
                    link="/pages/grind-timer/index"

                  />
                  <NavButton
                    imgSrc={Crown}
                    title="皇室纳贡"
                    description="只做最赚钱的箱子"
                    link="/pages/imperial-crates/index"
                  />
                </View>

                <View className="flex justify-center">
                  <Image src={Strength} className="h-10 mx-auto w-full" />
                </View>

                <View className="grid grid-cols-2 gap-3 mt-3 mb-3">
                  {/* Uncomment if needed
                  <NavButton
                    imgSrc="https://assets.garmoth.com/icons/menu/cron.png"
                    title="装备强化模拟"
                    description="装备/克罗恩/卡普"
                    link="/pages/enhancing-simulator/index"
                  />
                  */}
                  <NavButton
                    imgSrc={Goods}
                    title="猎场工具箱"
                    description="猎场明细及工具"
                    link="/pages/grind-tracker/global/index"
                  />
                  {/* <NavButton
                    imgSrc="https://assets.garmoth.com/icons/menu/characters.png"
                    title="配装大厅"
                    description="装备/水晶搭配"
                    link="/pages/gearing/index"
                  /> */}

                  <NavButton
                    imgSrc="https://assets.garmoth.com/icons/menu/skill-addon-planner.png"
                    title="技能强化大厅"
                    description="职业最热技能强化"
                    link="/pages/skill-addon-planner/index"
                  />

                  <NavButton
                    imgSrc={AttackPower}
                    title="战斗力计算器"
                    description="隐藏战力计算"
                    link="/pages/apdpdr-brackets/index"
                  />

                  <NavButton
                    imgSrc={Swoop}
                    title="怪点攻击计算"
                    description="怪点攻击上线计算"
                    link="/pages/monster-ap-caps/index"

                  />

                  {/* <NavButton
                    imgSrc="https://assets.garmoth.com/icons/menu/grind-timer.png"
                    title="打怪计时器"
                    description="记录同步打怪记录"
                    link="/pages/grind-timer/index"

                  /> */}

                </View>
              </BorderBox>
            </View>
          </View>

          {/* 右侧 */}
          <View className="lg:col-span-2">
            <View className="flex flex-col">
              <BorderBox leftAndRightBorderLength="[35px]">
                {/* Contents */}
                <View className="flex flex-col space-y-6">
                  {/* Top part */}
                  <View className="flex flex-col lg:flex-row justify-between gap-4">
                    {/* Left: Tailwind Carousel */}
                    <View className="w-full lg:w-1/2">
                      <Text className="font-semibold mb-2">最新消息</Text>
                      {' '}
                      {/* Title for the Carousel */}
                      <Carousel />
                    </View>

                    {/* Right: Grid with 4 images */}
                    <View className="w-full lg:w-1/2">
                      <Text className="font-semibold mb-2">游戏攻略</Text>
                      {' '}
                      {/* Title for the Grid */}
                      <View className="grid grid-cols-2 gap-3">
                        <Image
                          src="https://s1.pearlcdn.com/NAEU/Upload/thumbnail/2024/33W3DYL21G917KEL20240626083504222.400x225.gif"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Image
                          src="https://s1.pearlcdn.com/NAEU/Upload/thumbnail/2024/V52F73QFB6FDGDS120240930093531419.400x225.png"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Image
                          src="https://s1.pearlcdn.com/NAEU/Upload/thumbnail/2024/MLM4HNIY0ACRBCRR20240829105650258.400x225.jpg"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Image
                          src="https://s1.pearlcdn.com/NAEU/Upload/thumbnail/2024/9V6ISJ7I793TZ4VP20240718162140795.400x225.jpg"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      </View>
                    </View>
                  </View>

                  {/* 礼包兑换码 (Coupon Codes) */}
                  <View className="mt-6">
                    <View className="rounded-md">
                      <View className="flex items-center justify-between gap-3 pb-2">
                        <Text className="flex justify-center m-0 text-2xl">礼包兑换码</Text>
                        {/* Uncomment if you want to add buttons for more actions
                        <View className="flex gap-2">
                          <Navigator url="/coupons">
                            <Button className="bg-600 border-500 hover:border-400 px-2 h-10 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125 bg-700 text-sm opacity-50 hover:opacity-100">
                              显示更多
                            </Button>
                          </Navigator>
                          <Button className="bg-600 border-500 hover:border-400 px-2 h-10 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125 bg-700 text-sm opacity-50 hover:opacity-100">
                            提交新的序列码
                          </Button>
                        </View>
                        */}
                      </View>
                      <View className="container mx-auto px-4 py-4">
                        <View className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <CouponCard
                            imgSrc1="https://garmoth-assets.oss-cn-shanghai.aliyuncs.com/prod/coupon/coupon3_panda.png"
                            imgSrc2="https://garmoth-assets.oss-cn-shanghai.aliyuncs.com/prod/coupon/coupon4_scroll.png"
                            imgSrc3="https://garmoth-assets.oss-cn-shanghai.aliyuncs.com/prod/coupon/coupon5_revive.png"
                            imgSrc4="https://garmoth-assets.oss-cn-shanghai.aliyuncs.com/prod/coupon/coupon6_enhance.png"
                            expiration={1735488000000}
                            code="不用兑换码，直接点上面链接领取。"
                            imgCount={1}
                            title="【国服开服大礼包】熊猫领取"
                            description="https://bd.qq.com/cp/a20241022mxqh"
                          />
                          <CouponCard
                            imgSrc1="https://garmoth-assets.oss-cn-shanghai.aliyuncs.com/prod/coupon/coupon1_horse.png"
                            expiration={1735488000000}
                            code="HSSMHUANYINGNI"
                            imgCount={1}
                            title="【国服开服大礼包】幻想马（公马）"
                            description="https://bd.qq.com/cp/a202408161fulbh/index_pc.html"
                          />
                          <CouponCard
                            imgSrc1="https://garmoth-assets.oss-cn-shanghai.aliyuncs.com/prod/coupon/coupon2_box.png"
                            expiration={1735488000000}
                            code="HSSMGC01"
                            imgCount={1}
                            title="【国服开服大礼包】启航之箱"
                            description="https://bd.qq.com/cp/a202408161fulbh/index_pc.html"
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Gantt Chart */}
                  {/* <View className="mt-6">
                    <GanttChart />
                  </View> */}
                </View>
              </BorderBox>
            </View>
          </View>
        </View>
      </View>
      {/* <Footer /> */}
    </View>
  )
}

export default Home
