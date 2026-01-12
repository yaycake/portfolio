import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [titleReveal, setTitleReveal] = useState(0)
  const [descReveal, setDescReveal] = useState(0)
  const [buttonReveals, setButtonReveals] = useState([0, 0, 0, 0])
  const [isTitleComplete, setIsTitleComplete] = useState(false)
  const [isDescComplete, setIsDescComplete] = useState(false)
  const [activeContent, setActiveContent] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [contentReveals, setContentReveals] = useState<Record<string, number>>({})
  const [clickedActions, setClickedActions] = useState<string[]>([])
  const [bottomButtonReveals, setBottomButtonReveals] = useState<number[]>([])
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)
  const [showMoreExperiences, setShowMoreExperiences] = useState(false)

  const title = "Hi, I'm Grace Yang"
  const description = <>Cross-functional product designer combining design and code to craft AI-driven, user-friendly products.<br /><br />I prototype rapidly, validate with real users, and achieve measurable results—leading to increased engagement, streamlined workflows, and sleek interfaces.</>

  const experiences = [
    {
      iconColor: '#10b981', // green
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M18.2644 14.1966L13.0997 16.0997L11.1966 21.2644C11.144 21.4068 11.0491 21.5297 10.9245 21.6164C10.8 21.7032 10.6518 21.7498 10.5 21.7498C10.3482 21.7498 10.2001 21.7032 10.0755 21.6164C9.95096 21.5297 9.85601 21.4068 9.80344 21.2644L7.90032 16.0997L2.73563 14.1966C2.59322 14.144 2.47035 14.049 2.38356 13.9245C2.29677 13.8 2.25024 13.6518 2.25024 13.5C2.25024 13.3482 2.29677 13.2 2.38356 13.0755C2.47035 12.951 2.59322 12.856 2.73563 12.8034L7.90032 10.9003L9.80344 5.73562C9.85601 5.59321 9.95096 5.47034 10.0755 5.38355C10.2001 5.29676 10.3482 5.25024 10.5 5.25024C10.6518 5.25024 10.8 5.29676 10.9245 5.38355C11.0491 5.47034 11.144 5.59321 11.1966 5.73562L13.0997 10.9003L18.2644 12.8034C18.4068 12.856 18.5297 12.951 18.6165 13.0755C18.7032 13.2 18.7498 13.3482 18.7498 13.5C18.7498 13.6518 18.7032 13.8 18.6165 13.9245C18.5297 14.049 18.4068 14.144 18.2644 14.1966Z" fill="white"/>
          <path d="M18.5231 12.0994L13.6875 10.3125L11.9062 5.47312C11.8008 5.18656 11.6099 4.93924 11.3595 4.76455C11.109 4.58985 10.811 4.49619 10.5056 4.49619C10.2003 4.49619 9.90224 4.58985 9.65178 4.76455C9.40133 4.93924 9.21048 5.18656 9.105 5.47312L7.3125 10.3125L2.47312 12.0938C2.18656 12.1992 1.93924 12.3901 1.76455 12.6405C1.58985 12.891 1.49619 13.189 1.49619 13.4944C1.49619 13.7997 1.58985 14.0978 1.76455 14.3482C1.93924 14.5987 2.18656 14.7895 2.47312 14.895L7.3125 16.6875L9.09375 21.5269C9.19923 21.8134 9.39008 22.0608 9.64053 22.2355C9.89099 22.4101 10.189 22.5038 10.4944 22.5038C10.7997 22.5038 11.0978 22.4101 11.3482 22.2355C11.5987 22.0608 11.7895 21.8134 11.895 21.5269L13.6875 16.6875L18.5269 14.9062C18.8134 14.8008 19.0608 14.6099 19.2354 14.3595C19.4101 14.109 19.5038 13.811 19.5038 13.5056C19.5038 13.2003 19.4101 12.9022 19.2354 12.6518C19.0608 12.4013 18.8134 12.2105 18.5269 12.105L18.5231 12.0994ZM12.8437 15.3956C12.7419 15.4331 12.6495 15.4923 12.5728 15.569C12.4961 15.6457 12.4369 15.7382 12.3994 15.84L10.5 20.9859L8.60437 15.8438C8.56691 15.7409 8.50738 15.6474 8.42997 15.57C8.35255 15.4926 8.25912 15.4331 8.15625 15.3956L3.01406 13.5L8.15625 11.6044C8.25912 11.5669 8.35255 11.5074 8.42997 11.43C8.50738 11.3526 8.56691 11.2591 8.60437 11.1562L10.5 6.01406L12.3956 11.1562C12.4331 11.2581 12.4923 11.3505 12.569 11.4272C12.6457 11.5039 12.7382 11.5631 12.84 11.6006L17.9859 13.5L12.8437 15.3956ZM13.5 3.75C13.5 3.55109 13.579 3.36032 13.7197 3.21967C13.8603 3.07902 14.0511 3 14.25 3H15.75V1.5C15.75 1.30109 15.829 1.11032 15.9697 0.96967C16.1103 0.829018 16.3011 0.75 16.5 0.75C16.6989 0.75 16.8897 0.829018 17.0303 0.96967C17.171 1.11032 17.25 1.30109 17.25 1.5V3H18.75C18.9489 3 19.1397 3.07902 19.2803 3.21967C19.421 3.36032 19.5 3.55109 19.5 3.75C19.5 3.94891 19.421 4.13968 19.2803 4.28033C19.1397 4.42098 18.9489 4.5 18.75 4.5H17.25V6C17.25 6.19891 17.171 6.38968 17.0303 6.53033C16.8897 6.67098 16.6989 6.75 16.5 6.75C16.3011 6.75 16.1103 6.67098 15.9697 6.53033C15.829 6.38968 15.75 6.19891 15.75 6V4.5H14.25C14.0511 4.5 13.8603 4.42098 13.7197 4.28033C13.579 4.13968 13.5 3.94891 13.5 3.75ZM23.25 8.25C23.25 8.44891 23.171 8.63968 23.0303 8.78033C22.8897 8.92098 22.6989 9 22.5 9H21.75V9.75C21.75 9.94891 21.671 10.1397 21.5303 10.2803C21.3897 10.421 21.1989 10.5 21 10.5C20.8011 10.5 20.6103 10.421 20.4697 10.2803C20.329 10.1397 20.25 9.94891 20.25 9.75V9H19.5C19.3011 9 19.1103 8.92098 18.9697 8.78033C18.829 8.63968 18.75 8.44891 18.75 8.25C18.75 8.05109 18.829 7.86032 18.9697 7.71967C19.1103 7.57902 19.3011 7.5 19.5 7.5H20.25V6.75C20.25 6.55109 20.329 6.36032 20.4697 6.21967C20.6103 6.07902 20.8011 6 21 6C21.1989 6 21.3897 6.07902 21.5303 6.21967C21.671 6.36032 21.75 6.55109 21.75 6.75V7.5H22.5C22.6989 7.5 22.8897 7.57902 23.0303 7.71967C23.171 7.86032 23.25 8.05109 23.25 8.25Z" fill="white"/>
        </svg>
      ),
      role: "Founding Designer",
      description: "Built an AI powered patent platform to disrupt intellectual property workflows.",
      company: "Patlytics",
      duration: "2+ years"
    },
    {
      iconColor: '#3b82f6', // blue
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M18.75 6.75V17.25C18.75 17.4489 18.671 17.6397 18.5303 17.7803C18.3897 17.921 18.1989 18 18 18H3C2.80109 18 2.61032 17.921 2.46967 17.7803C2.32902 17.6397 2.25 17.4489 2.25 17.25V6.75C2.25 6.55109 2.32902 6.36032 2.46967 6.21967C2.61032 6.07902 2.80109 6 3 6H18C18.1989 6 18.3897 6.07902 18.5303 6.21967C18.671 6.36032 18.75 6.55109 18.75 6.75Z" fill="white"/>
          <path d="M23.6034 6.84375C23.4838 6.77964 23.3491 6.74919 23.2135 6.75563C23.078 6.76207 22.9467 6.80516 22.8337 6.88031L19.5 9.09844V6.75C19.5 6.35218 19.342 5.97064 19.0607 5.68934C18.7794 5.40804 18.3978 5.25 18 5.25H3C2.60218 5.25 2.22064 5.40804 1.93934 5.68934C1.65804 5.97064 1.5 6.35218 1.5 6.75V17.25C1.5 17.6478 1.65804 18.0294 1.93934 18.3107C2.22064 18.592 2.60218 18.75 3 18.75H18C18.3978 18.75 18.7794 18.592 19.0607 18.3107C19.342 18.0294 19.5 17.6478 19.5 17.25V14.9062L22.8337 17.1291C22.9576 17.2095 23.1024 17.2515 23.25 17.25C23.4489 17.25 23.6397 17.171 23.7803 17.0303C23.921 16.8897 24 16.6989 24 16.5V7.5C23.9991 7.36506 23.9617 7.23287 23.8919 7.11737C23.8221 7.00187 23.7225 6.90734 23.6034 6.84375ZM18 17.25H3V6.75H18V17.25ZM22.5 15.0984L19.5 13.0988V10.9012L22.5 8.90625V15.0984Z" fill="white"/>
        </svg>
      ),
      role: "Founding Designer",
      description: "Design a way to instantly live stream to troubleshoot and instantly find solutions.",
      company: "Viewabo",
      duration: "1+ years"
    },
    {
      iconColor: '#ef4444', // red
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M19.7119 19.7119C18.0966 21.3272 13.3369 19.1841 9.075 14.925C4.81312 10.6659 2.67281 5.90626 4.28812 4.28814C5.90343 2.67001 10.6631 4.81595 14.925 9.07501C19.1869 13.3341 21.3272 18.0938 19.7119 19.7119Z" fill="white"/>
          <path d="M18.3863 12C20.6972 8.75533 21.8756 5.40189 20.2369 3.76314C18.5981 2.12439 15.2447 3.30283 12 5.61376C8.75533 3.30283 5.40189 2.12439 3.76314 3.76314C2.12439 5.40189 3.30283 8.75533 5.61376 12C3.30283 15.2447 2.12439 18.5981 3.76314 20.2369C4.29095 20.7647 4.99595 21 5.8172 21C7.5497 21 9.7997 19.9528 12.0047 18.3863C14.2003 19.9528 16.4503 21 18.1875 21C19.0088 21 19.7147 20.7638 20.2416 20.2369C21.8756 18.5981 20.6972 15.2447 18.3863 12ZM19.1766 4.82345C19.8928 5.5397 19.4091 7.86095 17.4403 10.756C16.8175 9.98494 16.1544 9.24735 15.4538 8.54626C14.7526 7.84661 14.015 7.18443 13.2441 6.56251C16.1391 4.59376 18.4603 4.10626 19.1766 4.82345ZM16.5272 12C15.8638 12.8392 15.1513 13.6384 14.3935 14.3935C13.6384 15.1513 12.8392 15.8638 12 16.5272C11.1608 15.8638 10.3616 15.1513 9.60658 14.3935C8.84872 13.6384 8.13623 12.8392 7.47283 12C8.8038 10.3228 10.3228 8.8038 12 7.47283C12.8392 8.13623 13.6384 8.84872 14.3935 9.60658C15.1513 10.3616 15.8638 11.1608 16.5272 12ZM4.82345 4.82345C5.0297 4.61626 5.37001 4.50939 5.81908 4.50939C6.9272 4.50939 8.69626 5.15626 10.755 6.56251C9.9848 7.18494 9.24755 7.84709 8.54626 8.54626C7.84661 9.24742 7.18443 9.98501 6.56251 10.756C4.59376 7.86095 4.1072 5.5397 4.82345 4.82345ZM4.82345 19.1766C4.1072 18.4603 4.59376 16.1391 6.56251 13.2441C7.18535 14.0151 7.84846 14.7527 8.54908 15.4538C9.24978 16.1529 9.9864 16.815 10.756 17.4375C7.86095 19.4063 5.5397 19.8938 4.82345 19.1766ZM19.1766 19.1766C18.4603 19.8938 16.1391 19.4091 13.2441 17.4403C14.0147 16.817 14.7522 16.1539 15.4538 15.4538C16.1534 14.7526 16.8156 14.015 17.4375 13.2441C19.4063 16.1391 19.8928 18.4603 19.1766 19.1766ZM13.125 12C13.125 12.2225 13.059 12.44 12.9354 12.625C12.8118 12.81 12.6361 12.9542 12.4305 13.0394C12.225 13.1245 11.9988 13.1468 11.7805 13.1034C11.5623 13.06 11.3619 12.9528 11.2045 12.7955C11.0472 12.6382 10.94 12.4377 10.8966 12.2195C10.8532 12.0013 10.8755 11.7751 10.9606 11.5695C11.0458 11.3639 11.19 11.1882 11.375 11.0646C11.56 10.941 11.7775 10.875 12 10.875C12.2984 10.875 12.5845 10.9935 12.7955 11.2045C13.0065 11.4155 13.125 11.7016 13.125 12Z" fill="white"/>
        </svg>
      ),
      role: "Digital Director",
      description: "Manage digital operations for STEAM education and camps (& during COVID!)",
      company: "Skyrock",
      duration: "1.5 + years"
    },
    {
      iconColor: '#f97316', // orange
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M8.5 6L4 12L8.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 6L4 12L8.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.5 6L20 12L15.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 4L10 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      role: "Design & Code",
      description: "Design & development for Ubisoft Shanghai, ORM Fertility, and more.",
      company: "Freelance",
      duration: "10 + years"
    },
    {
      iconColor: '#f472b6', // pink
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89471 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17293 13.7558C2.82567 12.01 3.0039 10.2004 3.68508 8.55585C4.36627 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" fill="white"/>
          <path d="M8.625 13.125C8.4025 13.125 8.18499 13.059 7.99998 12.9354C7.81498 12.8118 7.67078 12.6361 7.58564 12.4305C7.50049 12.225 7.47821 11.9988 7.52162 11.7805C7.56503 11.5623 7.67217 11.3618 7.82951 11.2045C7.98684 11.0472 8.18729 10.94 8.40552 10.8966C8.62375 10.8532 8.84995 10.8755 9.05552 10.9606C9.26109 11.0458 9.43679 11.19 9.5604 11.375C9.68402 11.56 9.75 11.7775 9.75 12C9.75 12.2984 9.63147 12.5845 9.4205 12.7955C9.20952 13.0065 8.92337 13.125 8.625 13.125ZM15.375 10.875C15.1525 10.875 14.935 10.941 14.75 11.0646C14.565 11.1882 14.4208 11.3639 14.3356 11.5695C14.2505 11.775 14.2282 12.0012 14.2716 12.2195C14.315 12.4377 14.4222 12.6382 14.5795 12.7955C14.7368 12.9528 14.9373 13.06 15.1555 13.1034C15.3738 13.1468 15.6 13.1245 15.8055 13.0394C16.0111 12.9542 16.1868 12.81 16.3104 12.625C16.434 12.44 16.5 12.2225 16.5 12C16.5 11.7016 16.3815 11.4155 16.1705 11.2045C15.9595 10.9935 15.6734 10.875 15.375 10.875ZM14.2247 15.1153C13.5567 15.5299 12.7862 15.7496 12 15.7496C11.2138 15.7496 10.4433 15.5299 9.77531 15.1153C9.60698 15.0091 9.40337 14.9742 9.20927 15.0181C9.01517 15.0621 8.84648 15.1814 8.74031 15.3497C8.63414 15.518 8.59919 15.7216 8.64315 15.9157C8.6871 16.1098 8.80636 16.2785 8.97469 16.3847C9.88233 16.9505 10.9304 17.2504 12 17.2504C13.0696 17.2504 14.1177 16.9505 15.0253 16.3847C15.1936 16.2785 15.3129 16.1098 15.3569 15.9157C15.4008 15.7216 15.3659 15.518 15.2597 15.3497C15.1535 15.1814 14.9848 15.0621 14.7907 15.0181C14.5966 14.9742 14.393 15.0091 14.2247 15.1153ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46927 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43734 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97981 4.96452 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.2474 9.87623 19.4269 7.83506 17.9589 6.30036C16.4908 4.76565 14.4881 3.85533 12.3666 3.75844C11.28 5.28563 11.25 6.73875 11.25 6.75C11.25 6.94891 11.329 7.13968 11.4697 7.28033C11.6103 7.42098 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.42098 12.5303 7.28033C12.671 7.13968 12.75 6.94891 12.75 6.75C12.75 6.55109 12.829 6.36032 12.9697 6.21967C13.1103 6.07902 13.3011 6 13.5 6C13.6989 6 13.8897 6.07902 14.0303 6.21967C14.171 6.36032 14.25 6.55109 14.25 6.75C14.25 7.34674 14.0129 7.91903 13.591 8.34099C13.169 8.76295 12.5967 9 12 9C11.4033 9 10.831 8.76295 10.409 8.34099C9.98705 7.91903 9.75 7.34674 9.75 6.75C9.75 6.68156 9.76219 5.40937 10.5431 3.87844C8.99846 4.15557 7.56488 4.86752 6.4106 5.93074C5.25633 6.99396 4.42925 8.36435 4.02642 9.8811C3.62359 11.3978 3.66173 12.998 4.13635 14.4939C4.61096 15.9897 5.50238 17.3191 6.70599 18.3262C7.90959 19.3332 9.37546 19.9761 10.9316 20.1793C12.4877 20.3825 14.0695 20.1377 15.4914 19.4736C16.9132 18.8095 18.1162 17.7536 18.9591 16.4298C19.8019 15.106 20.2498 13.5693 20.25 12Z" fill="white"/>
        </svg>
      ),
      role: "Design Engineer",
      description: "Design & development for ORM Fertility.",
      company: "ORM Fertility",
      duration: "3 months"
    },
    {
      iconColor: '#22c55e', // green
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M15.3694 7.51031C15.2466 7.5 15.1237 7.5 15 7.5C13.9211 7.49992 12.8579 7.75846 11.8995 8.25396C10.9411 8.74945 10.1154 9.46746 9.49173 10.3478C8.86801 11.2282 8.46441 12.2452 8.31475 13.3137C8.16508 14.3821 8.27372 15.4709 8.63156 16.4888C7.64766 16.4364 6.68739 16.1678 5.81906 15.7022L3.21656 16.4672C3.08733 16.5051 2.95027 16.5076 2.81977 16.4743C2.68927 16.441 2.57014 16.3731 2.4749 16.2779C2.37967 16.1827 2.31183 16.0635 2.27853 15.933C2.24522 15.8025 2.24767 15.6655 2.28562 15.5363L3.04687 12.9375C2.61266 12.1179 2.35202 11.2176 2.28122 10.2928C2.21042 9.36798 2.33097 8.4385 2.63536 7.56235C2.93974 6.6862 3.42143 5.88219 4.05037 5.20047C4.6793 4.51876 5.44198 3.97398 6.29082 3.60013C7.13965 3.22628 8.05643 3.03137 8.98394 3.02758C9.91145 3.02379 10.8298 3.2112 11.6817 3.5781C12.5335 3.945 13.3006 4.48353 13.9351 5.16008C14.5696 5.83663 15.0578 6.63668 15.3694 7.51031Z" fill="white"/>
          <path d="M13.5 13.125C13.5 13.3475 13.434 13.565 13.3104 13.75C13.1868 13.935 13.0111 14.0792 12.8055 14.1644C12.6 14.2495 12.3738 14.2718 12.1555 14.2284C11.9373 14.185 11.7368 14.0778 11.5795 13.9205C11.4222 13.7632 11.315 13.5627 11.2716 13.3445C11.2282 13.1262 11.2505 12.9 11.3356 12.6945C11.4208 12.4889 11.565 12.3132 11.75 12.1896C11.935 12.066 12.1525 12 12.375 12C12.6734 12 12.9595 12.1185 13.1705 12.3295C13.3815 12.5405 13.5 12.8266 13.5 13.125ZM17.625 12C17.4025 12 17.185 12.066 17 12.1896C16.815 12.3132 16.6708 12.4889 16.5856 12.6945C16.5005 12.9 16.4782 13.1262 16.5216 13.3445C16.565 13.5627 16.6722 13.7632 16.8295 13.9205C16.9868 14.0778 17.1873 14.185 17.4055 14.2284C17.6238 14.2718 17.85 14.2495 18.0555 14.1644C18.2611 14.0792 18.4368 13.935 18.5604 13.75C18.684 13.565 18.75 13.3475 18.75 13.125C18.75 12.8266 18.6315 12.5405 18.4205 12.3295C18.2095 12.1185 17.9234 12 17.625 12ZM22.4381 19.8253C22.5143 20.0839 22.5194 20.3583 22.4529 20.6195C22.3863 20.8808 22.2506 21.1193 22.06 21.3099C21.8693 21.5006 21.6308 21.6363 21.3696 21.7029C21.1083 21.7694 20.8339 21.7643 20.5753 21.6881L18.2588 21.0066C17.3455 21.447 16.3524 21.6977 15.3396 21.7435C14.3267 21.7894 13.315 21.6293 12.3657 21.2731C11.4165 20.9169 10.5493 20.3719 9.81657 19.6711C9.08386 18.9702 8.50087 18.1281 8.10281 17.1956C7.28272 17.0992 6.48452 16.8663 5.74125 16.5066L3.42469 17.1881C3.16608 17.2643 2.89171 17.2694 2.63045 17.2029C2.36918 17.1363 2.13069 17.0006 1.94005 16.8099C1.74941 16.6193 1.61368 16.3808 1.54713 16.1195C1.48058 15.8583 1.48567 15.5839 1.56188 15.3253L2.24344 13.0087C1.81599 12.1094 1.57191 11.1339 1.52547 10.1391C1.47902 9.14444 1.63112 8.15043 1.9729 7.21513C2.31468 6.27983 2.83929 5.42195 3.51614 4.69154C4.19298 3.96114 5.0085 3.37283 5.91512 2.96095C6.82174 2.54906 7.80131 2.32185 8.79667 2.29255C9.79204 2.26326 10.7833 2.43248 11.7125 2.79033C12.6418 3.14818 13.4905 3.68751 14.2091 4.37685C14.9278 5.06618 15.5019 5.89172 15.8981 6.80531C17.0828 6.94806 18.2162 7.3714 19.2044 8.04016C20.1926 8.70892 21.0069 9.60381 21.5798 10.6505C22.1527 11.6972 22.4676 12.8654 22.4983 14.0582C22.5291 15.251 22.2748 16.434 21.7566 17.5087L22.4381 19.8253ZM7.62188 15.5906C7.43638 14.5746 7.46288 13.5312 7.69972 12.526C7.93657 11.5207 8.37864 10.5752 8.99819 9.74886C9.61774 8.92253 10.4014 8.23317 11.3 7.72404C12.1986 7.21492 13.1927 6.89702 14.22 6.79031C13.8398 6.10007 13.3274 5.49147 12.712 4.99926C12.0967 4.50705 11.3904 4.14086 10.6335 3.92161C9.10483 3.47882 7.46291 3.66141 6.06891 4.42921C4.6749 5.19702 3.643 6.48714 3.20021 8.01576C2.75742 9.54439 2.94001 11.1863 3.70781 12.5803C3.80015 12.7529 3.82135 12.9548 3.76688 13.1428L3 15.75L5.6025 14.9841C5.79052 14.9296 5.99239 14.9508 6.165 15.0431C6.62455 15.2886 7.11437 15.4727 7.62188 15.5906ZM20.2922 17.0803C20.9706 15.8115 21.1706 14.3411 20.8555 12.9372C20.5404 11.5333 19.7313 10.2893 18.5757 9.43213C17.4201 8.57493 15.9949 8.16155 14.56 8.26734C13.125 8.37313 11.7759 8.99105 10.7585 10.0085C9.74106 11.0259 9.12314 12.375 9.01734 13.8099C8.91155 15.2449 9.32494 16.6701 10.1821 17.8257C11.0393 18.9813 12.2833 19.7904 13.6872 20.1055C15.0911 20.4205 16.5615 20.2206 17.8303 19.5422C18.0029 19.4498 18.2048 19.4286 18.3928 19.4831L21 20.25L20.2341 17.6475C20.178 17.4582 20.1989 17.2543 20.2922 17.0803Z" fill="white"/>
        </svg>
      ),
      role: "Mini Program Designer",
      description: "Design & development for Ubisoft Shanghai.",
      company: "Ubisoft Shanghai",
      duration: "2 months"
    },
    {
      iconColor: '#06b6d4', // cyan
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M12 3C10.22 3 8.47991 3.52784 6.99987 4.51677C5.51983 5.50571 4.36627 6.91131 3.68508 8.55585C3.0039 10.2004 2.82567 12.01 3.17293 13.7558C3.5202 15.5016 4.37737 17.1053 5.63604 18.364C6.89471 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.4722 15.5201 21 13.78 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3ZM12 14.25C11.555 14.25 11.12 14.118 10.75 13.8708C10.38 13.6236 10.0916 13.2722 9.92127 12.861C9.75097 12.4499 9.70642 11.9975 9.79323 11.561C9.88005 11.1246 10.0943 10.7237 10.409 10.409C10.7237 10.0943 11.1246 9.88005 11.561 9.79323C11.9975 9.70642 12.4499 9.75097 12.861 9.92127C13.2722 10.0916 13.6236 10.38 13.8708 10.75C14.118 11.12 14.25 11.555 14.25 12C14.25 12.5967 14.0129 13.169 13.591 13.591C13.169 14.0129 12.5967 14.25 12 14.25Z" fill="white"/>
          <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97981 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43734 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46927 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77325 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.37799 15.1571C3.75357 13.6496 3.59019 11.9908 3.90852 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32015 5.01259 8.79016 4.22685 10.3905 3.90852C11.9908 3.59019 13.6496 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM12 6.75C10.6081 6.75149 9.27358 7.30509 8.28933 8.28933C7.30509 9.27358 6.75149 10.6081 6.75 12C6.75 12.1989 6.67098 12.3897 6.53033 12.5303C6.38968 12.671 6.19891 12.75 6 12.75C5.80109 12.75 5.61032 12.671 5.46967 12.5303C5.32902 12.3897 5.25 12.1989 5.25 12C5.25199 10.2104 5.96378 8.49466 7.22922 7.22922C8.49466 5.96378 10.2104 5.25199 12 5.25C12.1989 5.25 12.3897 5.32902 12.5303 5.46967C12.671 5.61032 12.75 5.80109 12.75 6C12.75 6.19891 12.671 6.38968 12.5303 6.53033C12.3897 6.67098 12.1989 6.75 12 6.75ZM18.75 12C18.748 13.7896 18.0362 15.5053 16.7708 16.7708C15.5053 18.0362 13.7896 18.748 12 18.75C11.8011 18.75 11.6103 18.671 11.4697 18.5303C11.329 18.3897 11.25 18.1989 11.25 18C11.25 17.8011 11.329 17.6103 11.4697 17.4697C11.6103 17.329 11.8011 17.25 12 17.25C13.3919 17.2485 14.7264 16.6949 15.7107 15.7107C16.6949 14.7264 17.2485 13.3919 17.25 12C17.25 11.8011 17.329 11.6103 17.4697 11.4697C17.6103 11.329 17.8011 11.25 18 11.25C18.1989 11.25 18.3897 11.329 18.5303 11.4697C18.671 11.6103 18.75 11.8011 18.75 12ZM15 12C15 11.4067 14.8241 10.8266 14.4944 10.3333C14.1648 9.83994 13.6962 9.45542 13.1481 9.22836C12.5999 9.0013 11.9967 8.94189 11.4147 9.05764C10.8328 9.1734 10.2982 9.45912 9.87868 9.87868C9.45912 10.2982 9.1734 10.8328 9.05764 11.4147C8.94189 11.9967 9.0013 12.5999 9.22836 13.148C9.45542 13.6962 9.83994 14.1648 10.3333 14.4944C10.8266 14.8241 11.4067 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12ZM10.5 12C10.5 11.7033 10.588 11.4133 10.7528 11.1666C10.9176 10.92 11.1519 10.7277 11.426 10.6142C11.7001 10.5006 12.0017 10.4709 12.2926 10.5288C12.5836 10.5867 12.8509 10.7296 13.0607 10.9393C13.2704 11.1491 13.4133 11.4164 13.4712 11.7074C13.5291 11.9983 13.4994 12.2999 13.3858 12.574C13.2723 12.8481 13.08 13.0824 12.8334 13.2472C12.5867 13.412 12.2967 13.5 12 13.5C11.6022 13.5 11.2206 13.342 10.9393 13.0607C10.658 12.7794 10.5 12.3978 10.5 12Z" fill="white"/>
        </svg>
      ),
      role: "Design Engineer",
      description: "Design & development for A Pure Person.",
      company: "A Pure Person",
      duration: "2 months"
    }
  ]

  const workingStyleTraits = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4C10 4 8 6 8 8C8 10 10 12 12 12C14 12 16 10 16 8C16 6 14 4 12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12V20M8 16H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 20H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: "Super IC",
      description: "Senior Product Designer shipping zero-to-one (greenfield) products end-to-end as a founding/solo designer. I own product discovery, rapid prototyping, and delivery, tracing business outcomes back to early problem framing, first-principles decisions, and validation loops."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="8" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 10H16M10 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 8V6M12 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="9" cy="13" r="1" fill="currentColor"/>
          <circle cx="15" cy="13" r="1" fill="currentColor"/>
        </svg>
      ),
      title: "Learning as Play",
      description: "Hypothesis-driven design at startup speed: customer discovery, lightweight experiments, clear decision gates. New domains (B2B SaaS, AI-powered workflows) become fuel to simplify complex, multi-step processes—reducing time-to-value and de-risking builds."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8L14 11L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 4L14 6L12 8L10 6L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Speedy iteration, Prioritize Feedback",
      description: "Insight-driven iteration with short feedback cycles across multi-stakeholder ecosystems. I pivot when evidence changes, using prototypes (including generative AI/LLM prototypes) as truth-finding tools to save engineering effort and accelerate learning per hour."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3H21M3 7H21M3 11H21M3 15H21M3 19H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5 2V22M19 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 1L10 3L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Strong visual design fundamentals",
      description: "Information architecture, interaction design, and clean hierarchy/spacing/typography keep complexity from becoming clutter. I align PM, Engineering, Sales, and Support around competing needs so platform experiences work across role-based users with different levels of sophistication."
    }
  ]

  const suggestedActions = [
    {
      id: 'experiences',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3H7L8 4H13V13H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 4V3H3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "Explore work"
    },
    {
      id: 'working-style',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 6.5C5.5 7.05228 5.94772 7.5 6.5 7.5C7.05228 7.5 7.5 7.05228 7.5 6.5C7.5 5.94772 7.05228 5.5 6.5 5.5C5.94772 5.5 5.5 5.94772 5.5 6.5Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8.5 9.5C8.5 10.0523 8.94772 10.5 9.5 10.5C10.0523 10.5 10.5 10.0523 10.5 9.5C10.5 8.94772 10.0523 8.5 9.5 8.5C8.94772 8.5 8.5 8.94772 8.5 9.5Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M4 10.5L6 8.5M12 5.5L10 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      text: "View Design Approach"
    },
    {
      id: 'contact',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6C3 4.89543 3.89543 4 5 4H11C12.1046 4 13 4.89543 13 6V10C13 11.1046 12.1046 12 11 12H7L4 14V12H5C3.89543 12 3 11.1046 3 10V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "Contact Me"
    },
    {
      id: 'linkedin',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3H13V13H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 6V10M10 6V10M6 6H10M6 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "LinkedIn",
      isLink: true,
      href: "https://www.linkedin.com/in/ygrace/"
    }
  ]

  // Easing function for organic feel
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
  }

  // Filter out clicked actions
  const availableActions = suggestedActions.filter(action => !clickedActions.includes(action.id))

  const handleActionClick = (actionId: string, isLink?: boolean, href?: string) => {
    // If it's a link, just open it (don't add to clicked actions or load content)
    if (isLink && href) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }
    
    // Prevent clicking the same action twice
    if (activeContent.includes(actionId) || clickedActions.includes(actionId)) return
    
    // Add to clicked actions (removes it from available actions list)
    setClickedActions(prev => [...prev, actionId])
    
    // Reset bottom section states for re-animation
    setBottomButtonReveals([])
    
    setIsLoading(true)
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
      // Append to active content array - this allows multiple content blocks
      // to be displayed in the order they were clicked (e.g., working-style before experiences)
      setActiveContent(prev => [...prev, actionId])
      
      // Start content reveal animation for this specific content
      const duration = 2000
      const startTime = Date.now()
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const rawProgress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(rawProgress) * 100
        
        setContentReveals(prev => ({
          ...prev,
          [actionId]: easedProgress
        }))
        
        if (rawProgress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }, 800) // 0.8s loading delay
  }

  useEffect(() => {
    // Smoothly reveal the title from top to bottom
    const duration = 1800 // 1.8 seconds
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(rawProgress) * 100
      
      setTitleReveal(easedProgress)
      
      if (rawProgress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsTitleComplete(true)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    // Smoothly reveal the description after title is complete
    if (!isTitleComplete) return

    const duration = 2500 // 2.5 seconds
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(rawProgress) * 100
      
      setDescReveal(easedProgress)
      
      if (rawProgress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsDescComplete(true)
      }
    }

    requestAnimationFrame(animate)
  }, [isTitleComplete])

  useEffect(() => {
    // Cascade the buttons after description is complete
    if (!isDescComplete) return

    const buttonDuration = 1200 // 1.2 seconds per button
    const delayBetweenButtons = 300 // 0.3s delay between each button

    suggestedActions.forEach((_, index) => {
      // For LinkedIn (index 3), wait until contact (index 2) has started revealing
      const delay = index === 3 
        ? 2 * delayBetweenButtons + 200 // Wait for contact to start, then add small delay
        : index * delayBetweenButtons
      
      setTimeout(() => {
        const startTime = Date.now()
        
        const animate = () => {
          const elapsed = Date.now() - startTime
          const rawProgress = Math.min(elapsed / buttonDuration, 1)
          const easedProgress = easeOutCubic(rawProgress) * 100
          
          setButtonReveals(prev => {
            const newReveals = [...prev]
            newReveals[index] = easedProgress
            return newReveals
          })
          
          if (rawProgress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
      }, delay)
    })
  }, [isDescComplete])

  useEffect(() => {
    // Cascade bottom buttons when content is loaded and there are available actions
    if (activeContent.length === 0 || availableActions.length === 0 || isLoading) return

    // Initialize button reveals array
    setBottomButtonReveals(new Array(availableActions.length).fill(0))

    const buttonDuration = 1200
    const delayBetweenButtons = 300

    // Small delay before starting bottom buttons animation
    setTimeout(() => {
      availableActions.forEach((_, index) => {
        setTimeout(() => {
          const startTime = Date.now()
          
          const animate = () => {
            const elapsed = Date.now() - startTime
            const rawProgress = Math.min(elapsed / buttonDuration, 1)
            const easedProgress = easeOutCubic(rawProgress) * 100
            
            setBottomButtonReveals(prev => {
              const newReveals = [...prev]
              newReveals[index] = easedProgress
              return newReveals
            })
            
            if (rawProgress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }, index * delayBetweenButtons)
      })
    }, 500) // Small delay after content starts loading
  }, [activeContent, availableActions.length, isLoading])

  // Handle ESC key to close overlay
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedExperience !== null) {
        setSelectedExperience(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [selectedExperience])

  return (
    <div className="landing-page">
      {selectedExperience !== null && (
        <div className="experience-overlay" onClick={() => setSelectedExperience(null)}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-navigation">
              <button 
                className="nav-link nav-back"
                onClick={() => setSelectedExperience(null)}
              >
                Close
              </button>
              <div className="nav-group">
                <button 
                  className="nav-link"
                  onClick={() => {
                    const prevIndex = selectedExperience > 0 ? selectedExperience - 1 : experiences.length - 1
                    setSelectedExperience(prevIndex)
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Previous
                </button>
                <button 
                  className="nav-link"
                  onClick={() => {
                    const nextIndex = selectedExperience < experiences.length - 1 ? selectedExperience + 1 : 0
                    setSelectedExperience(nextIndex)
                  }}
                >
                  Next
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {selectedExperience === 0 && (
              <div className="overlay-project">
                <div className="overlay-header">
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[0].iconColor }}
                    >
                      {experiences[0].icon}
                    </div>
                    <h1 className="overlay-title">{experiences[0].role}</h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[0].company}</span>
                    <span className="overlay-duration">{experiences[0].duration}</span>
                  </div>
                </div>
                <p className="overlay-description">{experiences[0].description}</p>
                
                <div className="overlay-section">
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Zero-to-one design lead for an AI-driven patent platform. I owned the loop: customer discovery → rapid prototyping → ship. Designed role-based, multi-stakeholder workflows; set patterns and decision gates; used generative AI to cut time-to-insight. My focus: keep complexity from becoming clutter—and make the hard parts feel obvious.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Problem</h2>
                  <p>Patent teams work across fragmented tools—legacy databases, spreadsheets, PDFs, and email—creating slow, expensive, and inconsistent workflows. Prior art search, claim mapping, and comparative analysis are manual and duplicative, with low reuse of knowledge. The result: long cycle times, high cost per search, uneven quality across teams, and limited confidence in decisions.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Discovery</h2>
                  
                  <h3 className="overlay-subsection-title">Hypothesis</h3>
                  <p>If generative AI handles the heavy lifting—search, synthesis, and first-pass comparisons—patent teams can spend their time where it counts: reasoning through evidence and quickly exploring, testing, and iterating on IP strategies. With guided, role-based flows and structured, explainable outputs (citations, controls, provenance), we should cut time-to-insight, improve consistency across stakeholders, and keep legal rigor intact while accelerating decision-making.</p>

                  <h3 className="overlay-subsection-title">Stakeholders</h3>
                  <ul className="overlay-list">
                    <li>In-house counsel: manage portfolios, assess risk, and make defensible decisions under time pressure.</li>
                    <li>Law firm partners/associates: monetize IP, standardize quality across matters, and reduce costly manual research.</li>
                    <li>Corporate R&D/product teams: inform strategy and investment with fast, explainable insights tied to technical provenance.</li>
                    <li>Patent analysts/search specialists: execute prior art and claim comparisons efficiently, with reusable, citeable outputs.</li>
                    <li>Procurement/Operations (secondary): control cost, ensure consistency, and integrate workflows with existing tools.</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Prototyping & methods</h3>
                  <ul className="overlay-list">
                    <li>Rapid, hypothesis-led prototyping in Figma to model search, analysis, and role-based flows; kept fidelity light to speed learning.</li>
                    <li>Generative AI/LLM prototypes to test auto-draft search, synthesis, and first-pass comparisons; instrumented prompts and guardrails for explainability.</li>
                    <li>Short feedback cycles with in-house counsel, firm attorneys, analysts, and R&D decision gates to pivot or deepen based on evidence.</li>
                    <li>Feasibility spikes with Engineering on ingestion, semantic comparison, and performance; aligned constraints early to de-risk builds.</li>
                    <li>Validation loops using real matters and edge cases; measured time-to-insight, reuse of outputs, and error rates to confirm direction.</li>
                  </ul>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Design Craft</h2>
                  
                  <h3 className="overlay-subsection-title">Principles</h3>
                  <ul className="overlay-list">
                    <li>Reduce cognitive load without hiding necessary complexity.</li>
                    <li>Keep provenance, citations, and explainability visible so outputs are trusted.</li>
                    <li>Let users move fluidly from search → analysis → synthesis with minimal friction.</li>
                    <li>Support fast scanning and deep dives; the UI should invite curiosity, not guesswork.</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Systems & decisions</h3>
                  <ul className="overlay-list">
                    <li>Information architecture oriented around strategy, not keywords—role-based flows and decision gates.</li>
                    <li>Interaction patterns that make comparisons legible (claim charts, overlap maps, side-by-sides).</li>
                    <li>Clean hierarchy, spacing, and typography to keep complexity from becoming clutter.</li>
                    <li>Structured, exportable outputs users can cite and reuse; guardrails to steer generative AI rather than accept black-box results.</li>
                    <li>Lightweight design system: components tuned for multi-stakeholder workflows and zero-to-one iteration speed.</li>
                  </ul>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Solution</h2>
                  
                  <h3 className="overlay-subsection-title">Learnings</h3>
                  <ul className="overlay-list">
                    <li>Generative AI shines at first-pass synthesis and comparison; humans should own framing, exceptions, and judgment.</li>
                    <li>Explainability (citations, provenance, controls) is a feature, not a footer; trust increases when users can interrogate results.</li>
                    <li>Prompt design is product design; guardrails and interaction patterns matter as much as models.</li>
                    <li>Designing for reuse (structured outputs, exportability) compounds value across matters and teams. This is important for all stakeholders and how they collaborate within their team structures</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Outcomes</h3>
                  <ul className="overlay-list">
                    <li>"You've returned the three hits that took from 15 - $20,000 in search companies to find... I don't know how these search companies are going to complete"</li>
                    <li>"Clients are spending, you know, nine to $15,000 on that project alone. So if we can do it faster and cheaper with this tool, that's a huge win".</li>
                    <li>"I think it really contextualizes it to show that this is the result you would get in 1/100th of the time that it normally takes to get us here"</li>
                    <li>"You know, it can take tasks that typically take, you know, days or weeks, and you know, make it take one day."</li>
                    <li>"Honestly, I'm looking at [ COMPETITOR ] as a competitor of yours... they say they do the same thing... I like your product better, it looks really well organized and it's a great UI".</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedExperience === 1 && (
              <div className="overlay-project">
                <div className="overlay-header">
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[1].iconColor }}
                    >
                      {experiences[1].icon}
                    </div>
                    <h1 className="overlay-title">{experiences[1].role}</h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[1].company}</span>
                    <span className="overlay-duration">{experiences[1].duration}</span>
                  </div>
                </div>
                <p className="overlay-description">{experiences[1].description}</p>
                
                <div className="overlay-section">
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Led end-to-end design for a real-time visual support platform and Zendesk integration. Shaped product strategy, defined the service blueprint, and built fast, reliable workflows for high-pressure support contexts. Partnered with engineering on WebRTC constraints, privacy-by-design guardrails, and low-bandwidth resiliency; collaborated with Sales/CS to align UX to measurable outcomes (resolution time, truck rolls, CSAT). Focus: turn messy field issues into clear, actionable evidence with minimal effort for non-technical users.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Problem</h2>
                  <p>Most support happens blind: text/email tickets, screenshots, and long back-and-forths. Agents can't see the issue, customers can't describe it, and resolution requires escalations or on-site visits. This drives slow ticket resolution, high operational cost, and frustrated customers—especially in hardware, home services, and field operations where context matters most.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Discovery</h2>
                  
                  <h3 className="overlay-subsection-title">Hypothesis</h3>
                  <p>If we make it one-tap to share live video—with consent, guidance, and lightweight capture—agents can diagnose in minutes instead of days. Structured evidence (annotated clips, device metadata, steps taken) should compress triage, improve first-contact resolution, and reduce unnecessary truck rolls while preserving user privacy.</p>

                  <h3 className="overlay-subsection-title">Stakeholders</h3>
                  <ul className="overlay-list">
                    <li>Support agents and team leads: need fast, reliable context to resolve and standardize quality.</li>
                    <li>Field technicians: require clear remote guidance and a record of work.</li>
                    <li>End customers: want frictionless, safe, and private help on mobile.</li>
                    <li>Customer Success/Ops: care about CSAT, cost per ticket, and playbook consistency.</li>
                    <li>Security/Compliance (secondary): require consent flows, data retention controls, and auditability.</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Prototyping & methods</h3>
                  <ul className="overlay-list">
                    <li>Figma flows simulating invite → join → capture → annotate → summarize; optimized for mobile first for the client's end-users.</li>
                    <li>WebRTC feasibility spikes: bandwidth adaptation, reconnect strategies, backups to guided photo capture.</li>
                    <li>Consent and privacy trials: explicit affordances, redaction, and opt-in data sharing.</li>
                    <li>Rapid hallway tests with agents/customers; time-to-diagnosis and error-rate instrumentation.</li>
                    <li>Service blueprinting across Support, CS, and Ops to align tooling and escalation paths.</li>
                  </ul>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Design Craft</h2>
                  
                  <h3 className="overlay-subsection-title">Principles</h3>
                  <ul className="overlay-list">
                    <li>Prioritize speed and clarity under stress; reduce steps without sacrificing safety.</li>
                    <li>Privacy-by-design: explicit consent, visible recording status, scoped data collection.</li>
                    <li>Mobile-first accessibility: large tap targets, readable UI in varied lighting, assistive prompts.</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Systems & decisions</h3>
                  <ul className="overlay-list">
                    <li>Invite mechanics: SMS/email deep links; no-app joins; device checks before session.</li>
                    <li>Guided capture: checklists, on-screen arrows, auto-focus hints, and quick annotations.</li>
                    <li>Case timeline: structured artifacts (clips, notes, parts) that travel across teams.</li>
                    <li>Low-bandwidth modes: adaptive video quality, snapshot fallback, and resumable sessions.</li>
                    <li>Lightweight design system tuned for field use—robust, legible, and forgiving.</li>
                  </ul>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Solution</h2>
                  <p>A streamlined, consent-forward visual support flow: agents send a secure link; customers join without installing an app, pass device checks, and share live video. The UI guides capture with overlays and prompts; agents annotate in real time, attach notes and parts, and generate a post-call summary. All artifacts land in a searchable case timeline that standardizes handoffs and accelerates repeat issues.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Learnings</h2>
                  <ul className="overlay-list">
                    <li>Reliability beats bells and whistles: reconnect logic and guidance matter more than fancy tools.</li>
                    <li>Consent is UX: clear status, control over what's shared, and easy exits increase trust.</li>
                    <li>Design for constraints: glare, noise, shaky hands; the interface must compensate.</li>
                    <li>Structured evidence unlocks scale: standardized artifacts improve routing, QA, and training.</li>
                  </ul>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Outcomes</h2>
                  <ul className="overlay-list">
                    <li>"Viewabo is a great product to interact with customers. I would say it's a positive experience and makes my life and the customer's lives easier...I am able to directly see what the customer is seeing and can help better navigate through troubleshooting steps. Sometimes it is very hard to explain something clearly just using words, so having a way to view the eyes through the customer has been very helpful."</li>
                    <li>"Overall, it takes out the guesswork on trying to figure out that the customer is trying to explain to us. We can literally see what there seeing in Realtime and not have to wait for emails to come in with pictures."</li>
                    <li>"Has helped many inexperienced customer locate components and troubleshoot their PCs"</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedExperience === 4 && (
              <div className="overlay-project">
                <div className="overlay-header">
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[4].iconColor }}
                    >
                      {experiences[4].icon}
                    </div>
                    <h1 className="overlay-title">{experiences[4].role}</h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[4].company}</span>
                    <span className="overlay-duration">{experiences[4].duration}</span>
                  </div>
                </div>
                <p className="overlay-description">{experiences[4].description}</p>
                
                <div className="overlay-section">
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Mini Program + Web Development for ORM Fertility. Designed and developed a WeChat Mini Program to help ORM Fertility establish their marketing presence in Shanghai and take ownership over their community in the WeChat ecosystem.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Problem</h2>
                  <p>ORM Fertility was laying down roots in Shanghai; as they looked to grow their marketing arm independent of local partners, they wanted a way to take ownership over their community. They needed a direct way to market their services in the WeChat ecosystem that would significantly decrease friction for people to share information on ORM as well as provide valuable insights and analytics.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Product Design</h2>
                  <p>ORM Fertility already had a WeChat Official Account, so I had to work with them to figure out how the mini program would fit in with their current marketing workflow and team resources. We went through a discovery phase, where I provided examples of different information-heavy mini programs and illustrated certain strengths and weaknesses of the mini program framework. We coasted through three user experience design rounds and user interaction design rounds.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Front End Development</h2>
                  <p>One of the most exciting phases of the project is where I take my designs and step into the front-end developer role to bring them to life. Working in the WeChat IDE, the framework has evolved with "React" features, so I organized all the front-end code into functional and higher-order components.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Skills & Tools</h2>
                  <p><strong>Skills:</strong> Product design, user interaction design, user experience design, WeChat development, front end development</p>
                  <p><strong>Tools:</strong> WXML, WXSS, WeChat components, Ruby on Rails, HTML, CSS, Javascript</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Status</h2>
                  <p>Currently, the project is in the process of being deployed onto Chinese servers beyond the Great Firewall.</p>
                </div>
              </div>
            )}

            {selectedExperience === 5 && (
              <div className="overlay-project">
                <div className="overlay-header">
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[5].iconColor }}
                    >
                      {experiences[5].icon}
                    </div>
                    <h1 className="overlay-title">{experiences[5].role}</h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[5].company}</span>
                    <span className="overlay-duration">{experiences[5].duration}</span>
                  </div>
                </div>
                <p className="overlay-description">{experiences[5].description}</p>
                
                <div className="overlay-section">
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Mini Program + Web Design for Ubisoft Shanghai's ChinaJoy Mini Program. Worked with the Ubisoft Shanghai creative, marketing, and mobile development teams to draft UX workflows, design UI elements, and provide front-end consulting for the WeChat framework.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Context</h2>
                  <p>Ubisoft Shanghai is the second largest Chinese development studio, and Ubisoft's second largest studio behind Ubisoft Montreal. Held annually in Shanghai, China, ChinaJoy or China Digital Entertainment Expo & Conference is a digital entertainment expo and the largest gaming and digital entertainment exhibition held in China and Asia.</p>
                  <p>ChinaJoy boasted 340,000+ visitors from all over the world. WeChat is the social, financial, and cultural infrastructure that everyday China relies on. With the advent of WeChat Mini Programs, Ubisoft Shanghai shared a vision of a community united through the excitement and passion of China Joy.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">The User Stories</h2>
                  <p>Users would be able to:</p>
                  <ul className="overlay-list">
                    <li>Book demos</li>
                    <li>Enter in lucky draw lotteries for limited edition prizes</li>
                    <li>Share event posts</li>
                    <li>Look up and stream scheduled live shows and other events</li>
                  </ul>
                  <p>As for Ubisoft Shanghai, they would be able to collect information on attendees, and be able to reach out and connect the China community to their official WeChat page.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">The Process</h2>
                  <p>I worked with the Ubisoft Shanghai creative, marketing, and mobile development teams to draft UX workflows, design UI elements, and provide some front-end consulting for the WeChat framework.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">The Deliverables</h2>
                  <p>I provided a full PDF UX map with labelled Sketch artboards & 3 edit rounds. I also provided all UI components and unique graphics specific to the Mini Program (i.e. icons for each of Ubisoft's games, the lucky draw backdrop).</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Skills & Tools</h2>
                  <p><strong>Skills:</strong> Product design, WeChat development</p>
                  <p><strong>Tools:</strong> Sketch, Figma, WeChat IDE, HTML, CSS, Javascript</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Coverage</h2>
                  <ul className="overlay-list">
                    <li>Ubisoft Is Taking China Joy By Storm-- WeChat Global</li>
                    <li>Ubisoft Brings Exciting Line Up To Chinajoy</li>
                    <li>Betta X Ubisoft China Joy Fish Le Zhi Leads You To The New World Of Games</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedExperience === 6 && (
              <div className="overlay-project">
                <div className="overlay-header">
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[6].iconColor }}
                    >
                      {experiences[6].icon}
                    </div>
                    <h1 className="overlay-title">{experiences[6].role}</h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[6].company}</span>
                    <span className="overlay-duration">{experiences[6].duration}</span>
                  </div>
                </div>
                <p className="overlay-description">{experiences[6].description}</p>
                
                <div className="overlay-section">
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Web Development for A Pure Person album website. Designed and developed an interactive audio-visual website to accompany the release of the Lin Qiang & Guests album, featuring minimal design aligned with the album cover and audio-visual interactivity for each track.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">The Idea</h2>
                  <p>The Lin Qiang & Guests production team wanted a website to accompany the release of their album. Priorities for the site included:</p>
                  <ul className="overlay-list">
                    <li>A minimal design very close to the digital and physical album cover</li>
                    <li>A type of audio-visual interactivity for each track</li>
                  </ul>
                  <p>Inspirations included <em>Holodec.world</em>'s website by creative digital design and development agency Bureau Cool. The way the album was designed, however, begged a simpler design for the interactivity. Looking at the fairly minimal design, I proposed a type of audio visualization with the image associated with each track.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Research, Tools, and Processes</h2>
                  <p>While I hadn't executed an interactive creative concept like this, I was very excited to dive in. Research and requirements led me to Web Audio API + CurtainsJS.</p>
                  <p>I initialized the project with Gatsby.js thinking we would have more pages to work with, but as the album cover design was finalized, I stripped the structure of the site down to match.</p>
                  <p>Combing through documentation for both Web Audio and CurtainsJS, I learned how to create a simple plane, loaded image textures, create audio analyzer nodes and accessed audio data. I connected audio data to the simple plane animation effects using audio frequencies and mouse delta values.</p>
                  <p>The team wanted to use the website animation effect for the visual of the streamers, so I also helped the team create screen recordings for "streamers", or audio previews to be posted on Instagram and Youtube.</p>
                  <p>Towards the end of the project, I tested and optimized the site for accessibility and improved performance with code-splitting and lazy loading.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">The Site</h2>
                  <p>For the soft launch and teaser, the team requested that only certain tracks be available before October 15th, the hard launch of the album.</p>
                  <p>The project is currently live at apureperson.com.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Skills & Tools</h2>
                  <p><strong>Skills:</strong> Product design, front-end development</p>
                  <p><strong>Tools:</strong> Javascript, HTML, CSS, Sass, GatsbyJS, CurtainsJS, Web Audio API</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="content">
        <h1 className="title">
          <span 
            className="reveal-text"
            style={{ 
              '--reveal-progress': `${titleReveal}%`
            } as React.CSSProperties}
          >
            {title}
          </span>
        </h1>
        {isTitleComplete && (
          <p className="description">
            <span 
              className="reveal-text"
              style={{ 
                '--reveal-progress': `${descReveal}%`
              } as React.CSSProperties}
            >
              {description}
            </span>
          </p>
        )}
        {activeContent.map((contentId) => {
              const contentReveal = contentReveals[contentId] || 0
              
              if (contentId === 'experiences') {
                return (
                  <div key={contentId} className="content-block">
                    <div className="experiences-content">
                      <h2 className="content-title">
                        <span 
                          className="reveal-text"
                          style={{ 
                            '--reveal-progress': `${contentReveal}%`
                          } as React.CSSProperties}
                        >
                          What have I helped build lately?
                        </span>
                      </h2>
                      <p className="content-subtitle">
                        <span 
                          className="reveal-text"
                          style={{ 
                            '--reveal-progress': `${Math.max(0, Math.min(100, (contentReveal - 80) * 5))}%`
                          } as React.CSSProperties}
                        >
                          Here's a quick preview of my latest experiences:
                        </span>
                      </p>
                      <div className="experiences-list">
                        {(showMoreExperiences ? experiences : experiences.slice(0, 4)).map((exp, index) => {
                          // If showing more experiences and this is one of the newly added items (index >= 4),
                          // show immediately since content is already loaded
                          const isNewItem = showMoreExperiences && index >= 4
                          const shouldShowImmediately = isNewItem
                          
                          // First item starts when subtitle is at 80% (subtitleProgress = 80)
                          // Subtitle reaches 80% when: (contentReveal - 80) * 5 = 80
                          // So: contentReveal = 80 + 16 = 96
                          // Each subsequent item starts when previous is at 80%
                          // Since we have limited range, compress the timing
                          const firstItemStart = 85 // Start first item earlier
                          const itemSpacing = 3 // Space between items (compressed)
                          const itemStartPoint = firstItemStart + (index * itemSpacing)
                          
                          // Calculate item progress with faster animation to fit in remaining range
                          const remainingRange = 100 - itemStartPoint
                          const itemProgress = shouldShowImmediately 
                            ? 100 
                            : contentReveal >= itemStartPoint
                            ? Math.min(100, ((contentReveal - itemStartPoint) / remainingRange) * 100)
                            : 0
                          
                          // Ensure items complete when contentReveal reaches 100%
                          const finalProgress = shouldShowImmediately || (contentReveal >= 100 && itemProgress > 0)
                            ? 100 
                            : itemProgress
                          
                          // Calculate cascading progress for elements within this experience item
                          // Icon starts first, then role at 80%, description at 80% of role, etc.
                          const iconProgress = finalProgress
                          const roleStartPoint = 80
                          const roleProgress = iconProgress >= roleStartPoint
                            ? Math.min(100, ((iconProgress - roleStartPoint) / (100 - roleStartPoint)) * 100)
                            : 0
                          const descStartPoint = 80
                          const descProgress = roleProgress >= descStartPoint
                            ? Math.min(100, ((roleProgress - descStartPoint) / (100 - descStartPoint)) * 100)
                            : 0
                          const companyStartPoint = 80
                          const companyProgress = descProgress >= companyStartPoint
                            ? Math.min(100, ((descProgress - companyStartPoint) / (100 - companyStartPoint)) * 100)
                            : 0
                          const durationStartPoint = 80
                          const durationProgress = companyProgress >= durationStartPoint
                            ? Math.min(100, ((companyProgress - durationStartPoint) / (100 - durationStartPoint)) * 100)
                            : 0
                          
                          // Ensure all elements complete when item completes
                          const ensureComplete = (progress: number) => finalProgress >= 100 && progress > 0 ? 100 : progress
                          
                          return (
                            <div 
                              key={index}
                              className="experience-item"
                              onClick={() => setSelectedExperience(index)}
                            >
                              <div 
                                className={`experience-icon ${ensureComplete(iconProgress) >= 100 ? 'fully-revealed' : ''}`}
                                style={{ 
                                  backgroundColor: exp.iconColor,
                                  '--reveal-progress': `${ensureComplete(iconProgress)}%`
                                } as React.CSSProperties}
                              >
                                {exp.icon}
                              </div>
                              <div className="experience-content">
                                <div className="experience-main">
                                  <h3 
                                    className="experience-role"
                                    style={{ 
                                      '--reveal-progress': `${ensureComplete(roleProgress)}%`
                                    } as React.CSSProperties}
                                  >
                                    {exp.role}
                                  </h3>
                                  <p 
                                    className="experience-description"
                                    style={{ 
                                      '--reveal-progress': `${ensureComplete(descProgress)}%`
                                    } as React.CSSProperties}
                                  >
                                    {exp.description}
                                  </p>
                                </div>
                                <div className="experience-meta">
                                  <span 
                                    className="experience-company"
                                    style={{ 
                                      '--reveal-progress': `${ensureComplete(companyProgress)}%`
                                    } as React.CSSProperties}
                                  >
                                    {exp.company}
                                  </span>
                                  <span 
                                    className="experience-duration"
                                    style={{ 
                                      '--reveal-progress': `${ensureComplete(durationProgress)}%`
                                    } as React.CSSProperties}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                                      <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                    {exp.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      {!showMoreExperiences && (
                        <button 
                          className="see-more-button"
                          onClick={() => setShowMoreExperiences(true)}
                        >
                          See more
                        </button>
                      )}
                    </div>
                  </div>
                )
              }
              
              if (contentId === 'working-style') {
                const howIWorkSteps = [
                  {
                    iconLine: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.75 7.5V10.5C18.75 10.6989 18.671 10.8897 18.5303 11.0303C18.3897 11.171 18.1989 11.25 18 11.25C17.8011 11.25 17.6103 11.171 17.4697 11.0303C17.329 10.8897 17.25 10.6989 17.25 10.5V8.25H15C14.8011 8.25 14.6103 8.17098 14.4697 8.03033C14.329 7.88968 14.25 7.69891 14.25 7.5C14.25 7.30109 14.329 7.11032 14.4697 6.96967C14.6103 6.82902 14.8011 6.75 15 6.75H18C18.1989 6.75 18.3897 6.82902 18.5303 6.96967C18.671 7.11032 18.75 7.30109 18.75 7.5ZM9 15.75H6.75V13.5C6.75 13.3011 6.67098 13.1103 6.53033 12.9697C6.38968 12.829 6.19891 12.75 6 12.75C5.80109 12.75 5.61032 12.829 5.46967 12.9697C5.32902 13.1103 5.25 13.3011 5.25 13.5V16.5C5.25 16.6989 5.32902 16.8897 5.46967 17.0303C5.61032 17.171 5.80109 17.25 6 17.25H9C9.19891 17.25 9.38968 17.171 9.53033 17.0303C9.67098 16.8897 9.75 16.6989 9.75 16.5C9.75 16.3011 9.67098 16.1103 9.53033 15.9697C9.38968 15.829 9.19891 15.75 9 15.75ZM21.75 5.25V18.75C21.75 19.1478 21.592 19.5294 21.3107 19.8107C21.0294 20.092 20.6478 20.25 20.25 20.25H3.75C3.35218 20.25 2.97064 20.092 2.68934 19.8107C2.40804 19.5294 2.25 19.1478 2.25 18.75V5.25C2.25 4.85218 2.40804 4.47064 2.68934 4.18934C2.97064 3.90804 3.35218 3.75 3.75 3.75H20.25C20.6478 3.75 21.0294 3.90804 21.3107 4.18934C21.592 4.47064 21.75 4.85218 21.75 5.25ZM20.25 18.75V5.25H3.75V18.75H20.25Z" fill="currentColor"/>
                      </svg>
                    ),
                    iconFill: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 3.75H3.75C3.35218 3.75 2.97064 3.90804 2.68934 4.18934C2.40804 4.47064 2.25 4.85218 2.25 5.25V18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97064 20.092 3.35218 20.25 3.75 20.25H20.25C20.6478 20.25 21.0294 20.092 21.3107 19.8107C21.592 19.5294 21.75 19.1478 21.75 18.75V5.25C21.75 4.85218 21.592 4.47064 21.3107 4.18934C21.0294 3.90804 20.6478 3.75 20.25 3.75ZM8.25 18H5.25C5.05109 18 4.86032 17.921 4.71967 17.7803C4.57902 17.6397 4.5 17.4489 4.5 17.25V14.25C4.5 14.0511 4.57902 13.8603 4.71967 13.7197C4.86032 13.579 5.05109 13.5 5.25 13.5C5.44891 13.5 5.63968 13.579 5.78033 13.7197C5.92098 13.8603 6 14.0511 6 14.25V16.5H8.25C8.44891 16.5 8.63968 16.579 8.78033 16.7197C8.92098 16.8603 9 17.0511 9 17.25C9 17.4489 8.92098 17.6397 8.78033 17.7803C8.63968 17.921 8.44891 18 8.25 18ZM19.5 9.75C19.5 9.94891 19.421 10.1397 19.2803 10.2803C19.1397 10.421 18.9489 10.5 18.75 10.5C18.5511 10.5 18.3603 10.421 18.2197 10.2803C18.079 10.1397 18 9.94891 18 9.75V7.5H15.75C15.5511 7.5 15.3603 7.42098 15.2197 7.28033C15.079 7.13968 15 6.94891 15 6.75C15 6.55109 15.079 6.36032 15.2197 6.21967C15.3603 6.07902 15.5511 6 15.75 6H18.75C18.9489 6 19.1397 6.07902 19.2803 6.21967C19.421 6.36032 19.5 6.55109 19.5 6.75V9.75Z" fill="currentColor"/>
                      </svg>
                    ),
                    title: "Frame",
                    description: "Define the problem, users, and constraints with data and interviews."
                  },
                  {
                    iconLine: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 3.75H3.75C3.35218 3.75 2.97064 3.90804 2.68934 4.18934C2.40804 4.47064 2.25 4.85218 2.25 5.25V18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97064 20.092 3.35218 20.25 3.75 20.25H20.25C20.6478 20.25 21.0294 20.092 21.3107 19.8107C21.592 19.5294 21.75 19.1478 21.75 18.75V5.25C21.75 4.85218 21.592 4.47064 21.3107 4.18934C21.0294 3.90804 20.6478 3.75 20.25 3.75ZM20.25 18.75H3.75V5.25H20.25V18.75ZM7.5 7.875C7.5 8.0975 7.43402 8.31501 7.3104 8.50002C7.18679 8.68502 7.01109 8.82922 6.80552 8.91436C6.59995 8.99951 6.37375 9.02179 6.15552 8.97838C5.93729 8.93498 5.73684 8.82783 5.5795 8.6705C5.42217 8.51316 5.31502 8.31271 5.27162 8.09448C5.22821 7.87625 5.25049 7.65005 5.33564 7.44448C5.42078 7.23891 5.56498 7.06321 5.74998 6.9396C5.93499 6.81598 6.1525 6.75 6.375 6.75C6.67337 6.75 6.95952 6.86853 7.1705 7.0795C7.38147 7.29048 7.5 7.57663 7.5 7.875ZM11.25 7.875C11.25 8.0975 11.184 8.31501 11.0604 8.50002C10.9368 8.68502 10.7611 8.82922 10.5555 8.91436C10.35 8.99951 10.1238 9.02179 9.90552 8.97838C9.68729 8.93498 9.48684 8.82783 9.3295 8.6705C9.17217 8.51316 9.06502 8.31271 9.02162 8.09448C8.97821 7.87625 9.00049 7.65005 9.08564 7.44448C9.17078 7.23891 9.31498 7.06321 9.49998 6.9396C9.68499 6.81598 9.9025 6.75 10.125 6.75C10.4234 6.75 10.7095 6.86853 10.9205 7.0795C11.1315 7.29048 11.25 7.57663 11.25 7.875Z" fill="currentColor"/>
                      </svg>
                    ),
                    iconFill: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 3.75H3.75C3.35218 3.75 2.97064 3.90804 2.68934 4.18934C2.40804 4.47064 2.25 4.85218 2.25 5.25V18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97064 20.092 3.35218 20.25 3.75 20.25H20.25C20.6478 20.25 21.0294 20.092 21.3107 19.8107C21.592 19.5294 21.75 19.1478 21.75 18.75V5.25C21.75 4.85218 21.592 4.47064 21.3107 4.18934C21.0294 3.90804 20.6478 3.75 20.25 3.75ZM6.375 9C6.1525 9 5.93499 8.93402 5.74998 8.8104C5.56498 8.68679 5.42078 8.51109 5.33564 8.30552C5.25049 8.09995 5.22821 7.87375 5.27162 7.65552C5.31502 7.43729 5.42217 7.23684 5.5795 7.0795C5.73684 6.92217 5.93729 6.81502 6.15552 6.77162C6.37375 6.72821 6.59995 6.75049 6.80552 6.83564C7.01109 6.92078 7.18679 7.06498 7.3104 7.24998C7.43402 7.43499 7.5 7.6525 7.5 7.875C7.5 8.17337 7.38147 8.45952 7.1705 8.6705C6.95952 8.88147 6.67337 9 6.375 9ZM10.125 9C9.9025 9 9.68499 8.93402 9.49998 8.8104C9.31498 8.68679 9.17078 8.51109 9.08564 8.30552C9.00049 8.09995 8.97821 7.87375 9.02162 7.65552C9.06502 7.43729 9.17217 7.23684 9.3295 7.0795C9.48684 6.92217 9.68729 6.81502 9.90552 6.77162C10.1238 6.72821 10.35 6.75049 10.5555 6.83564C10.7611 6.92078 10.9368 7.06498 11.0604 7.24998C11.184 7.43499 11.25 7.6525 11.25 7.875C11.25 8.17337 11.1315 8.45952 10.9205 8.6705C10.7095 8.88147 10.4234 9 10.125 9Z" fill="currentColor"/>
                      </svg>
                    ),
                    title: "Prototype",
                    description: "Code high-fidelity prototypes to test real interactions early."
                  },
                  {
                    iconLine: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.25 10.5H20.6325L16.1794 4.36781C16.0444 4.18253 15.8688 4.03065 15.666 3.92381C15.4632 3.81698 15.2387 3.75804 15.0095 3.75152C14.7804 3.745 14.5529 3.79108 14.3443 3.88621C14.1358 3.98135 13.9518 4.12301 13.8066 4.30031L12.6019 5.69719L12.5831 5.71875C12.5133 5.80644 12.4246 5.87726 12.3237 5.92594C12.2227 5.97461 12.1121 5.99989 12 5.99989C11.8879 5.99989 11.7773 5.97461 11.6763 5.92594C11.5754 5.87726 11.4867 5.80644 11.4169 5.71875L11.3981 5.69719L10.1934 4.30031C10.0482 4.12301 9.86422 3.98135 9.65568 3.88621C9.44714 3.79108 9.21958 3.745 8.99046 3.75152C8.76134 3.75804 8.53676 3.81698 8.33397 3.92381C8.13118 4.03065 7.95557 4.18253 7.82062 4.36781L3.3675 10.5H0.75C0.551088 10.5 0.360322 10.579 0.21967 10.7197C0.0790176 10.8603 0 11.0511 0 11.25C0 11.4489 0.0790176 11.6397 0.21967 11.7803C0.360322 11.921 0.551088 12 0.75 12H23.25C23.4489 12 23.6397 11.921 23.7803 11.7803C23.921 11.6397 24 11.4489 24 11.25C24 11.0511 23.921 10.8603 23.7803 10.7197C23.6397 10.579 23.4489 10.5 23.25 10.5ZM9.03187 5.25L9.04969 5.27156L10.2544 6.6675C10.4654 6.92693 10.7315 7.13607 11.0335 7.27971C11.3354 7.42336 11.6656 7.49789 12 7.49789C12.3344 7.49789 12.6646 7.42336 12.9665 7.27971C13.2685 7.13607 13.5346 6.92693 13.7456 6.6675L14.9503 5.27156C14.9559 5.26406 14.9597 5.2575 14.9662 5.25L18.7781 10.5H5.22094L9.03187 5.25ZM16.875 13.5C16.0449 13.5002 15.2441 13.8062 14.6254 14.3596C14.0068 14.9131 13.6138 15.6751 13.5216 16.5H10.4784C10.386 15.6758 9.99334 14.9146 9.37539 14.3614C8.75745 13.8083 7.95748 13.5021 7.12815 13.5012C6.29882 13.5003 5.49819 13.8048 4.87904 14.3565C4.25989 14.9083 3.86557 15.6687 3.77133 16.4927C3.67709 17.3166 3.88953 18.1465 4.3681 18.8238C4.84667 19.5011 5.55788 19.9785 6.36599 20.1649C7.17411 20.3512 8.02256 20.2336 8.74944 19.8343C9.47632 19.435 10.0307 18.782 10.3069 18H13.6931C13.8994 18.5834 14.262 19.0988 14.7414 19.49C15.2209 19.8811 15.7986 20.133 16.4115 20.218C17.0243 20.303 17.6488 20.2179 18.2166 19.972C18.7843 19.726 19.2736 19.3287 19.6308 18.8235C19.988 18.3183 20.1995 17.7246 20.2421 17.1073C20.2847 16.49 20.1568 15.8729 19.8723 15.3234C19.5879 14.774 19.1578 14.3132 18.6292 13.9916C18.1006 13.6701 17.4938 13.5 16.875 13.5ZM7.125 18.75C6.75416 18.75 6.39165 18.64 6.08331 18.434C5.77496 18.228 5.53464 17.9351 5.39273 17.5925C5.25081 17.2499 5.21368 16.8729 5.28603 16.5092C5.35837 16.1455 5.53695 15.8114 5.79917 15.5492C6.0614 15.287 6.39549 15.1084 6.75921 15.036C7.12292 14.9637 7.49992 15.0008 7.84253 15.1427C8.18514 15.2846 8.47798 15.525 8.68401 15.8333C8.89003 16.1416 9 16.5042 9 16.875C9 17.1212 8.9515 17.365 8.85727 17.5925C8.76305 17.82 8.62494 18.0267 8.45083 18.2008C8.27672 18.3749 8.07002 18.513 7.84253 18.6073C7.61505 18.7015 7.37123 18.75 7.125 18.75ZM16.875 18.75C16.5042 18.75 16.1416 18.64 15.8333 18.434C15.525 18.228 15.2846 17.9351 15.1427 17.5925C15.0008 17.2499 14.9637 16.8729 15.036 16.5092C15.1084 16.1455 15.287 15.8114 15.5492 15.5492C15.8114 15.287 16.1455 15.1084 16.5092 15.036C16.8729 14.9637 17.2499 15.0008 17.5925 15.1427C17.9351 15.2846 18.228 15.525 18.434 15.8333C18.64 16.1416 18.75 16.5042 18.75 16.875C18.75 17.3723 18.5525 17.8492 18.2008 18.2008C17.8492 18.5525 17.3723 18.75 16.875 18.75Z" fill="currentColor"/>
                      </svg>
                    ),
                    iconFill: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 11.25C24 11.4489 23.921 11.6397 23.7803 11.7803C23.6397 11.921 23.4489 12 23.25 12H0.75C0.551088 12 0.360322 11.921 0.21967 11.7803C0.0790176 11.6397 0 11.4489 0 11.25C0 11.0511 0.0790176 10.8603 0.21967 10.7197C0.360322 10.579 0.551088 10.5 0.75 10.5H3.3675L7.82062 4.36781C7.95557 4.18253 8.13118 4.03065 8.33397 3.92381C8.53676 3.81698 8.76134 3.75804 8.99046 3.75152C9.21958 3.745 9.44714 3.79108 9.65568 3.88621C9.86422 3.98135 10.0482 4.12301 10.1934 4.30031L11.3981 5.69719L11.4169 5.71875C11.4867 5.80644 11.5754 5.87726 11.6763 5.92594C11.7773 5.97461 11.8879 5.99989 12 5.99989C12.1121 5.99989 12.2227 5.97461 12.3237 5.92594C12.4246 5.87726 12.5133 5.80644 12.5831 5.71875L12.6019 5.69719L13.8066 4.30031C13.9518 4.12301 14.1358 3.98135 14.3443 3.88621C14.5529 3.79108 14.7804 3.745 15.0095 3.75152C15.2387 3.75804 15.4632 3.81698 15.666 3.92381C15.8688 4.03065 16.0444 4.18253 16.1794 4.36781L20.6325 10.5H23.25C23.4489 10.5 23.6397 10.579 23.7803 10.7197C23.921 10.8603 24 11.0511 24 11.25ZM16.875 13.5C16.0449 13.5002 15.2441 13.8062 14.6254 14.3596C14.0068 14.9131 13.6138 15.6751 13.5216 16.5H10.4784C10.386 15.6758 9.99334 14.9146 9.37539 14.3614C8.75745 13.8083 7.95748 13.5021 7.12815 13.5012C6.29882 13.5003 5.49819 13.8048 4.87904 14.3565C4.25989 14.9083 3.86557 15.6687 3.77133 16.4927C3.67709 17.3166 3.88953 18.1465 4.3681 18.8238C4.84667 19.5011 5.55788 19.9785 6.36599 20.1649C7.17411 20.3512 8.02256 20.2336 8.74944 19.8343C9.47632 19.435 10.0307 18.782 10.3069 18H13.6931C13.8994 18.5834 14.262 19.0988 14.7414 19.49C15.2209 19.8811 15.7986 20.133 16.4115 20.218C17.0243 20.303 17.6488 20.2179 18.2166 19.972C18.7843 19.726 19.2736 19.3287 19.6308 18.8235C19.988 18.3183 20.1995 17.7246 20.2421 17.1073C20.2847 16.49 20.1568 15.8729 19.8723 15.3234C19.5879 14.774 19.1578 14.3132 18.6292 13.9916C18.1006 13.6701 17.4938 13.5 16.875 13.5Z" fill="currentColor"/>
                      </svg>
                    ),
                    title: "Validate",
                    description: "Run usability tests; iterate quickly on signal, not noise."
                  },
                  {
                    iconLine: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.1625 6.62346L12.2062 3.77909C12.1049 3.75003 11.9985 3.74268 11.8941 3.75753L2.03812 5.16565C1.68127 5.21814 1.35506 5.39683 1.11871 5.6693C0.882364 5.94178 0.751544 6.28996 0.75 6.65065V17.3494C0.751544 17.7101 0.882364 18.0583 1.11871 18.3307C1.35506 18.6032 1.68127 18.7819 2.03812 18.8344L11.8941 20.2406C11.9291 20.2461 11.9645 20.2493 12 20.25C12.0698 20.2502 12.1392 20.2404 12.2062 20.221L22.1625 17.3766C22.4748 17.2862 22.7494 17.0972 22.9454 16.8378C23.1414 16.5784 23.2483 16.2626 23.25 15.9375V8.06253C23.2483 7.73743 23.1414 7.42163 22.9454 7.16226C22.7494 6.90289 22.4748 6.71389 22.1625 6.62346ZM9 11.25H7.5V5.90065L11.25 5.3644V18.6357L7.5 18.0994V12.75H9C9.19891 12.75 9.38968 12.671 9.53033 12.5304C9.67098 12.3897 9.75 12.1989 9.75 12C9.75 11.8011 9.67098 11.6103 9.53033 11.4697C9.38968 11.329 9.19891 11.25 9 11.25ZM2.25 6.65065L6 6.1144V11.25H4.5C4.30109 11.25 4.11032 11.329 3.96967 11.4697C3.82902 11.6103 3.75 11.8011 3.75 12C3.75 12.1989 3.82902 12.3897 3.96967 12.5304C4.11032 12.671 4.30109 12.75 4.5 12.75H6V17.8857L2.25 17.3494V6.65065ZM12.75 18.5053V5.49471L21.75 8.06253V15.9375L12.75 18.5053Z" fill="currentColor"/>
                      </svg>
                    ),
                    iconFill: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.1625 6.62346L12.2062 3.77909C12.1049 3.75003 11.9985 3.74268 11.8941 3.75753L2.03812 5.16565C1.68127 5.21814 1.35506 5.39683 1.11871 5.6693C0.882364 5.94178 0.751544 6.28996 0.75 6.65065V17.3494C0.751544 17.7101 0.882364 18.0583 1.11871 18.3307C1.35506 18.6032 1.68127 18.7819 2.03812 18.8344L11.8941 20.2406C11.9291 20.2461 11.9645 20.2493 12 20.25C12.0698 20.2502 12.1392 20.2404 12.2062 20.221L22.1625 17.3766C22.4748 17.2862 22.7494 17.0972 22.9454 16.8378C23.1414 16.5784 23.2483 16.2626 23.25 15.9375V8.06253C23.2483 7.73743 23.1414 7.42163 22.9454 7.16226C22.7494 6.90289 22.4748 6.71389 22.1625 6.62346ZM6 11.25H4.5C4.30109 11.25 4.11032 11.329 3.96967 11.4697C3.82902 11.6103 3.75 11.8011 3.75 12C3.75 12.1989 3.82902 12.3897 3.96967 12.5304C4.11032 12.671 4.30109 12.75 4.5 12.75H6V17.8857L2.25 17.3494V6.65065L6 6.1144V11.25ZM11.25 18.6357L7.5 18.0994V12.75H9C9.19891 12.75 9.38968 12.671 9.53033 12.5304C9.67098 12.3897 9.75 12.1989 9.75 12C9.75 11.8011 9.67098 11.6103 9.53033 11.4697C9.38968 11.329 9.19891 11.25 9 11.25H7.5V5.90065L11.25 5.3644V18.6357Z" fill="currentColor"/>
                      </svg>
                    ),
                    title: "Ship",
                    description: "Partner with engineering to deliver accessible, performant UI."
                  },
                  {
                    iconLine: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.0612 6.87846L17.1216 1.93971C16.9823 1.80038 16.8169 1.68986 16.6349 1.61446C16.4529 1.53905 16.2578 1.50024 16.0608 1.50024C15.8638 1.50024 15.6687 1.53905 15.4867 1.61446C15.3047 1.68986 15.1393 1.80038 15 1.93971L1.93874 15C1.79942 15.1393 1.6889 15.3047 1.6135 15.4867C1.53809 15.6687 1.49928 15.8638 1.49928 16.0608C1.49928 16.2578 1.53809 16.4529 1.6135 16.6349C1.6889 16.8169 1.79942 16.9823 1.93874 17.1216L6.87843 22.0603C7.01772 22.1997 7.1831 22.3102 7.36511 22.3856C7.54712 22.461 7.7422 22.4998 7.93921 22.4998C8.13622 22.4998 8.33131 22.461 8.51332 22.3856C8.69533 22.3102 8.8607 22.1997 8.99999 22.0603L22.0612 9.00002C22.2006 8.86073 22.3111 8.69535 22.3865 8.51334C22.4619 8.33133 22.5007 8.13625 22.5007 7.93924C22.5007 7.74222 22.4619 7.54714 22.3865 7.36513C22.3111 7.18312 22.2006 7.01775 22.0612 6.87846ZM7.93874 21L2.99999 16.0603L5.99999 13.0603L8.46937 15.5306C8.53905 15.6003 8.62178 15.6556 8.71282 15.6933C8.80387 15.731 8.90145 15.7504 8.99999 15.7504C9.09854 15.7504 9.19612 15.731 9.28717 15.6933C9.37821 15.6556 9.46094 15.6003 9.53062 15.5306C9.6003 15.461 9.65558 15.3782 9.69329 15.2872C9.731 15.1961 9.75041 15.0986 9.75041 15C9.75041 14.9015 9.731 14.8039 9.69329 14.7128C9.65558 14.6218 9.6003 14.5391 9.53062 14.4694L7.06031 12L8.99999 10.0603L11.4694 12.5306C11.6101 12.6714 11.801 12.7504 12 12.7504C12.199 12.7504 12.3899 12.6714 12.5306 12.5306C12.6714 12.3899 12.7504 12.199 12.7504 12C12.7504 11.801 12.6714 11.6101 12.5306 11.4694L10.0603 9.00002L12 7.06033L14.4694 9.53064C14.5391 9.60033 14.6218 9.6556 14.7128 9.69331C14.8039 9.73102 14.9014 9.75043 15 9.75043C15.0985 9.75043 15.1961 9.73102 15.2872 9.69331C15.3782 9.6556 15.4609 9.60033 15.5306 9.53064C15.6003 9.46096 15.6556 9.37823 15.6933 9.28719C15.731 9.19614 15.7504 9.09856 15.7504 9.00002C15.7504 8.90147 15.731 8.80389 15.6933 8.71285C15.6556 8.6218 15.6003 8.53907 15.5306 8.46939L13.0603 6.00002L16.0603 3.00002L21 7.93971L7.93874 21Z" fill="currentColor"/>
                      </svg>
                    ),
                    iconFill: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.0612 9.00002L8.99999 22.0603C8.8607 22.1997 8.69533 22.3102 8.51332 22.3856C8.33131 22.461 8.13622 22.4998 7.93921 22.4998C7.7422 22.4998 7.54712 22.461 7.36511 22.3856C7.1831 22.3102 7.01772 22.1997 6.87843 22.0603L1.93874 17.1216C1.79942 16.9823 1.6889 16.8169 1.6135 16.6349C1.53809 16.4529 1.49928 16.2578 1.49928 16.0608C1.49928 15.8638 1.53809 15.6687 1.6135 15.4867C1.6889 15.3047 1.79942 15.1393 1.93874 15L4.67343 12.2653C4.70826 12.2305 4.74962 12.2028 4.79514 12.1839C4.84067 12.1651 4.88946 12.1553 4.93874 12.1553C4.98802 12.1553 5.03682 12.1651 5.08235 12.1839C5.12787 12.2028 5.16923 12.2305 5.20406 12.2653L8.46937 15.5306C8.54229 15.6035 8.62944 15.6606 8.72539 15.6983C8.82135 15.7359 8.92404 15.7534 9.02706 15.7496C9.13008 15.7459 9.23121 15.7209 9.32414 15.6763C9.41707 15.6316 9.49981 15.5684 9.56718 15.4903C9.69035 15.3417 9.75297 15.1522 9.74255 14.9595C9.73212 14.7668 9.64941 14.5851 9.51093 14.4506L6.26437 11.2041C6.19424 11.1338 6.15485 11.0385 6.15485 10.9392C6.15485 10.8399 6.19424 10.7447 6.26437 10.6744L7.67062 9.26814C7.70545 9.23328 7.74681 9.20562 7.79233 9.18674C7.83785 9.16787 7.88665 9.15816 7.93593 9.15816C7.98521 9.15816 8.03401 9.16787 8.07953 9.18674C8.12506 9.20562 8.16642 9.23328 8.20124 9.26814L11.4666 12.5335C11.5395 12.6063 11.6266 12.6634 11.7226 12.7011C11.8185 12.7387 11.9212 12.7562 12.0242 12.7525C12.1273 12.7487 12.2284 12.7237 12.3213 12.6791C12.4143 12.6345 12.497 12.5712 12.5644 12.4931C12.6875 12.3446 12.7502 12.155 12.7397 11.9623C12.7293 11.7696 12.6466 11.5879 12.5081 11.4535L9.26531 8.20408C9.19518 8.13378 9.15579 8.03853 9.15579 7.93924C9.15579 7.83994 9.19518 7.74469 9.26531 7.67439L10.6716 6.26814C10.7419 6.19801 10.8371 6.15863 10.9364 6.15863C11.0357 6.15863 11.1309 6.19801 11.2012 6.26814L14.4666 9.53346C14.5395 9.60648 14.6267 9.66366 14.7227 9.70143C14.8188 9.7392 14.9216 9.75674 15.0247 9.75296C15.1279 9.74918 15.2291 9.72415 15.3221 9.67944C15.4151 9.63474 15.4979 9.57131 15.5653 9.49314C15.6884 9.34445 15.7508 9.15482 15.7402 8.96211C15.7296 8.76939 15.6467 8.58776 15.5081 8.45345L12.2653 5.20408C12.1952 5.13378 12.1558 5.03854 12.1558 4.93924C12.1558 4.83994 12.1952 4.74469 12.2653 4.67439L15 1.93971C15.1393 1.80038 15.3047 1.68986 15.4867 1.61446C15.6687 1.53905 15.8638 1.50024 16.0608 1.50024C16.2578 1.50024 16.4529 1.53905 16.6349 1.61446C16.8169 1.68986 16.9823 1.80038 17.1216 1.93971L22.0612 6.87846C22.2006 7.01775 22.3111 7.18312 22.3865 7.36513C22.4619 7.54714 22.5007 7.74222 22.5007 7.93924C22.5007 8.13625 22.4619 8.33133 22.3865 8.51334C22.3111 8.69535 22.2006 8.86073 22.0612 9.00002Z" fill="currentColor"/>
                      </svg>
                    ),
                    title: "Measure",
                    description: "Track activation, conversion, and task success; refine post-launch."
                  }
                ]

                return (
                  <div key={contentId} className="content-block">
                    <div className="working-style-content">
                      <h2 className="content-title">
                        <span
                          className="reveal-text"
                          style={{
                            '--reveal-progress': `${contentReveal}%`
                          } as React.CSSProperties}
                        >
                          How I Work
                        </span>
                      </h2>
                      <div className="how-i-work-list">
                        {howIWorkSteps.map((step, index) => {
                          const stepStartPoint = 60 + (index * 8)
                          const stepProgress = contentReveal >= stepStartPoint
                            ? Math.min(100, ((contentReveal - stepStartPoint) / (100 - stepStartPoint)) * 100)
                            : 0
                          const finalStepProgress = contentReveal >= 100 && stepProgress > 0 ? 100 : stepProgress

                          return (
                            <div
                              key={index}
                              className="how-i-work-item"
                              style={{
                                '--reveal-progress': `${finalStepProgress}%`
                              } as React.CSSProperties}
                            >
                              <div className="how-i-work-icon">{step.icon}</div>
                              <div className="how-i-work-text">
                                <span className="how-i-work-title">{step.title}</span>
                                <span className="how-i-work-description">{step.description}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      <h2 className="content-title" style={{ marginTop: '2rem' }}>
                        <span
                          className="reveal-text"
                          style={{
                            '--reveal-progress': `${contentReveal}%`
                          } as React.CSSProperties}
                        >
                          What kind of designer am I?
                        </span>
                      </h2>
                      <div className="working-style-list">
                        {workingStyleTraits.map((trait, index) => {
                          // First item starts when title is at 80% (contentReveal = 80)
                          // Each subsequent item starts when previous is at 80%
                          // Compress timing to fit all items
                          const firstItemStart = 80
                          const itemSpacing = 6 // Space between items
                          const itemStartPoint = firstItemStart + (index * itemSpacing)
                          
                          // Calculate item progress with faster animation to fit in remaining range
                          const remainingRange = 100 - itemStartPoint
                          const itemProgress = contentReveal >= itemStartPoint
                            ? Math.min(100, ((contentReveal - itemStartPoint) / remainingRange) * 100)
                            : 0
                          
                          // Ensure items complete when contentReveal reaches 100%
                          const finalProgress = contentReveal >= 100 && itemProgress > 0 
                            ? 100 
                            : itemProgress
                          
                          return (
                            <div 
                              key={index}
                              className="working-style-item"
                              style={{ 
                                '--reveal-progress': `${finalProgress}%`
                              } as React.CSSProperties}
                            >
                              <div className="working-style-icon">
                                {trait.icon}
                              </div>
                              <div className="working-style-text">
                                <h3 className="working-style-title">{trait.title}</h3>
                                <p className="working-style-description">{trait.description}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              }
              
              if (contentId === 'contact') {
                return (
                  <div key={contentId} className="content-block">
                    <div className="contact-content">
                      <h2 className="content-title">
                        <span 
                          className="reveal-text"
                          style={{ 
                            '--reveal-progress': `${contentReveal}%`
                          } as React.CSSProperties}
                        >
                          Contact Me
                        </span>
                      </h2>
                      <form className="contact-form">
                        <div className="form-field">
                          <label className="form-label">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 4L8 8L14 4M2 4H14V12H2V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-input"
                            placeholder="Where should I follow up?"
                          />
                        </div>
                        <div className="form-field">
                          <label className="form-label">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 6C3 4.89543 3.89543 4 5 4H11C12.1046 4 13 4.89543 13 6V10C13 11.1046 12.1046 12 11 12H7L4 14V12H5C3.89543 12 3 11.1046 3 10V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Message
                          </label>
                          <textarea
                            className="form-textarea"
                            placeholder="What's up? Ask me anything"
                            rows={5}
                          />
                        </div>
                        <div className="form-field">
                          <label className="form-label">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M8 1V3M8 13V15M15 8H13M3 8H1M13.07 3.93L11.66 5.34M4.34 11.66L2.93 13.07M13.07 13.07L11.66 11.66M4.34 4.34L2.93 2.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            How did you find me?
                          </label>
                          <div className="form-select-wrapper">
                            <select className="form-select">
                              <option value="">This would be helpful to know</option>
                              <option value="linkedin">LinkedIn</option>
                              <option value="twitter">Twitter</option>
                              <option value="github">GitHub</option>
                              <option value="portfolio">Portfolio</option>
                              <option value="referral">Referral</option>
                              <option value="other">Other</option>
                            </select>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="select-arrow">
                              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        <div className="form-actions">
                          <button type="submit" className="form-submit-button">
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              }
              
              return null
            })}
        {isLoading && (
          <div className="content-block">
            <div className="loading-state">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        {isDescComplete && clickedActions.length === 0 && (
          <div className="suggested-actions">
            <div className="actions-list">
                {suggestedActions.map((action, index) => {
                  // Only start LinkedIn animation after contact (index 2) has reached 50% progress
                  if (action.id === 'linkedin' && buttonReveals[2] < 50) {
                    return null
                  }
                  
                  if ('isLink' in action && action.isLink && 'href' in action && action.href) {
                    const linkAction = action as { id: string; icon: React.ReactElement; text: string; isLink: boolean; href: string }
                    return (
                      <a
                        key={action.id}
                        href={linkAction.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button"
                        onClick={(e) => {
                          e.preventDefault()
                          handleActionClick(action.id, linkAction.isLink, linkAction.href)
                        }}
                        style={{ 
                          '--reveal-progress': `${buttonReveals[index]}%`
                        } as React.CSSProperties}
                      >
                        <span className="action-icon">{action.icon}</span>
                        <span className="action-text">{action.text}</span>
                        <span className="action-arrow">→</span>
                      </a>
                    )
                  }
                  return (
                    <button
                      key={action.id}
                      className="action-button"
                      onClick={() => handleActionClick(action.id)}
                      style={{ 
                        '--reveal-progress': `${buttonReveals[index]}%`
                      } as React.CSSProperties}
                    >
                      <span className="action-icon">{action.icon}</span>
                      <span className="action-text">{action.text}</span>
                      <span className="action-arrow">→</span>
                    </button>
                  )
                })}
              </div>
          </div>
        )}
        {clickedActions.length > 0 && availableActions.length > 0 && activeContent.length > 0 && !isLoading && (
          <div className="suggested-actions-bottom">
            <div className="actions-list">
                {availableActions.map((action, index) => {
                  if ('isLink' in action && action.isLink && 'href' in action && action.href) {
                    const linkAction = action as { id: string; icon: React.ReactElement; text: string; isLink: boolean; href: string }
                    return (
                      <a
                        key={action.id}
                        href={linkAction.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button"
                        onClick={(e) => {
                          e.preventDefault()
                          handleActionClick(action.id, linkAction.isLink, linkAction.href)
                        }}
                        style={{ 
                          '--reveal-progress': `${bottomButtonReveals[index] || 0}%`
                        } as React.CSSProperties}
                      >
                        <span className="action-icon">{action.icon}</span>
                        <span className="action-text">{action.text}</span>
                        <span className="action-arrow">→</span>
                      </a>
                    )
                  }
                  return (
                    <button
                      key={action.id}
                      className="action-button"
                      onClick={() => handleActionClick(action.id)}
                      style={{ 
                        '--reveal-progress': `${bottomButtonReveals[index] || 0}%`
                      } as React.CSSProperties}
                    >
                      <span className="action-icon">{action.icon}</span>
                      <span className="action-text">{action.text}</span>
                      <span className="action-arrow">→</span>
                    </button>
                  )
                })}
              </div>
          </div>
        )}
      </div>
      </div>
  )
}

export default App
