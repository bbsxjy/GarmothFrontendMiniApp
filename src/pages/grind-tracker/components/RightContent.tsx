import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Summary from '../Summary'
import BestGrindSpots from '../BestGrindSpots'

const RightContent: React.FC = () => {
  return (
    <div className="h-full grow overflow-y-auto px-2 py-1 pb-2 lg:p-3">
      <div className="container-2xl flex flex-col gap-3">
        <Routes>
          <Route path="/grind-tracker/user/summary" element={<Summary />} />
          <Route path="/grind-tracker/best-grind-spots" element={<BestGrindSpots />} />
        </Routes>
      </div>
    </div>
  )
}

export default RightContent
