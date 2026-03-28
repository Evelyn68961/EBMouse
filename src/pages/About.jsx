import React from 'react';
import { useLang } from '../App';
import Hamster, { HamsterNeutral, HamsterThinking, HamsterCelebrating, HamsterLoading, HamsterConcerned } from '../components/Hamster';

export default function About() {
  const { lang } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <Hamster mood="neutral" size={80} className="mx-auto mb-4" />
        <h1 className="font-display font-bold text-3xl text-teal-700 mb-2">
          {lang === "zh" ? "關於 EBMouse" : "About EBMouse"}
        </h1>
        <p className="text-lg text-gray-500">EBM 鼠出任務 — {lang === "zh" ? "你的實證醫學小幫手" : "Your EBM Learning Companion"}</p>
      </div>

      <div className="max-w-none space-y-8">
        {lang === "zh" ? (
          <>
            <section>
              <h2 className="font-display text-xl font-semibold text-teal-700 mb-3">這是什麼？</h2>
              <p className="text-gray-600 leading-loose mb-3">
                EBMouse 是一個引導式的實證醫學 (EBM) 學習平台。你可以輸入臨床情境，跟著小倉鼠一步步完成 5A 流程（Assess → Ask → Acquire → Appraise → Apply），最後自動產出競賽簡報。
              </p>
              <p className="text-gray-600 leading-loose">
                學習的過程就是產出的過程——每一步教你方法，同時收集你的輸入，最終彙整成完整的成果。
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-teal-700 mb-3">誰做的？</h2>
              <p className="text-gray-600 leading-loose">
                由輔仁大學附設醫院藥劑部開發，作為 EBM 競賽準備與藥劑部新人訓練的工具。
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-teal-700 mb-3">相關專案</h2>
              <p className="text-gray-600 leading-loose">
                <a href="https://meta-analysis-101.vercel.app" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-semibold underline underline-offset-2">Meta-Analysis 101</a> — 系統性回顧與統合分析的互動教學平台（C0–C5 課程 + 實作工作坊）
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="font-display text-xl font-semibold text-teal-700 mb-3">What is this?</h2>
              <p className="text-gray-600 leading-loose mb-3">
                EBMouse is a guided evidence-based medicine (EBM) learning platform. Enter a clinical scenario, follow the hamster through the 5A workflow (Assess → Ask → Acquire → Appraise → Apply), and automatically generate a competition-ready presentation.
              </p>
              <p className="text-gray-600 leading-loose">
                Learning IS producing — each step teaches methodology while collecting your inputs, which are compiled into polished deliverables at the end.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-teal-700 mb-3">Who built this?</h2>
              <p className="text-gray-600 leading-loose">
                Developed by the Department of Pharmacy at Fu Jen Catholic University Hospital, as a tool for EBM competition preparation and junior pharmacist training.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-teal-700 mb-3">Related Projects</h2>
              <p className="text-gray-600 leading-loose">
                <a href="https://meta-analysis-101.vercel.app" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-semibold underline underline-offset-2">Meta-Analysis 101</a> — Interactive SR/MA learning platform (Courses C0–C5 + hands-on workshops)
              </p>
            </section>
          </>
        )}
      </div>

      {/* Hamster gallery */}
      <div className="mt-12 text-center">
        <h3 className="font-display font-semibold text-gray-600 mb-4">
          {lang === "zh" ? "認識小鼠的表情" : "Meet the Hamster's Moods"}
        </h3>
        <div className="flex justify-center gap-6">
          {[
            { Comp: HamsterNeutral, label: { zh: "歡迎", en: "Welcome" } },
            { Comp: HamsterThinking, label: { zh: "思考", en: "Thinking" } },
            { Comp: HamsterCelebrating, label: { zh: "慶祝", en: "Celebrating" } },
            { Comp: HamsterLoading, label: { zh: "衝刺", en: "Loading" } },
            { Comp: HamsterConcerned, label: { zh: "擔心", en: "Concerned" } },
          ].map(({ Comp, label }) => (
            <div key={label.en} className="text-center">
              <Comp size={48} />
              <p className="text-xs text-gray-400 mt-1">{label[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
