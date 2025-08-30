// "use client"

// import { useState, useEffect } from "react"
// import { Shield, Award, Clock, Users, CheckCircle, Star } from "lucide-react"
// import WebsiteDataService, { TrustIndicatorsInfo } from "@/lib/website-data"

// const iconMap: { [key: string]: any } = {
//   Shield, Award, Clock, Users, CheckCircle, Star
// }

// export function TrustIndicators() {
//   const [trustInfo, setTrustInfo] = useState<TrustIndicatorsInfo | null>(null)

//   useEffect(() => {
//     setTrustInfo(WebsiteDataService.getTrustIndicatorsInfo())
//   }, [])

//   if (!trustInfo) {
//     return null
//   }

//   return (
//     <section className="py-24 bg-white">
//       <div className="container mx-auto px-6">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-light text-[#2c2c2c] mb-4">
//             <span className="font-bold text-[#540f6b]">{trustInfo.title}</span>
//           </h2>
//           <p className="text-xl text-[#6b7280] max-w-3xl mx-auto">
//             {trustInfo.subtitle}
//           </p>
//         </div>

//         {/* Guarantees Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//           {trustInfo.guarantees.map((guarantee, index) => {
//             const IconComponent = iconMap[guarantee.icon]
//             return (
//               <div key={index} className="text-center">
//                 <div className="bg-[#f5f3f0] rounded-2xl p-8 mb-4 border border-[#e5e1dc] hover:border-[#c48765] transition-colors duration-300">
//                   {IconComponent && <IconComponent className="w-12 h-12 text-[#540f6b] mx-auto mb-4" />}
//                   <div className="text-3xl font-bold text-[#2c2c2c] mb-1">{guarantee.title}</div>
//                   <div className="text-[#c48765] font-medium mb-2">{guarantee.subtitle}</div>
//                   <p className="text-[#6b7280] text-sm">{guarantee.description}</p>
//                 </div>
//               </div>
//             )
//           })}
//         </div>

//         {/* Trust Factors */}
//         <div className="bg-[#f5f3f0] rounded-2xl p-8 border border-[#e5e1dc]">
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {trustInfo.trustFactors.map((factor, index) => (
//               <div key={index} className="flex items-center gap-3">
//                 <CheckCircle className="w-5 h-5 text-[#540f6b] flex-shrink-0" />
//                 <span className="text-[#2c2c2c] text-sm md:text-base font-medium">{factor}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
