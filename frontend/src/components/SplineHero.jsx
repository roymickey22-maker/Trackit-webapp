// frontend/src/components/SplineHero.jsx
import React, { Suspense } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function SplineHero({ sceneUrl }) {
  const fallbackImg = "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading 3D Scene...</p>
          </div>
        </div>
      }>
        <Spline scene={sceneUrl || "https://prod.spline.design/your-scene-url/scene.splinecode"} />
      </Suspense>
    </div>
  );
}