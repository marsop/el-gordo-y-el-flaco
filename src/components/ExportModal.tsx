import React, { useState } from 'react';
import { X, FileText, Download, Printer, Copy, Check, Table, FileSpreadsheet, Sparkles } from 'lucide-react';
import { WeeklyPlan, DAYS_OF_WEEK, PantryItem } from '../types';
import { exportToCSV, exportToMarkdown, generateMarkdown, triggerPrintPlan } from '../utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: WeeklyPlan;
  pantryItems?: PantryItem[];
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, plan, pantryItems }) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'markdown' | 'csv'>('pdf');
  const [copiedMd, setCopiedMd] = useState(false);

  if (!isOpen) return null;

  const markdownContent = generateMarkdown(plan, pantryItems);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl border-4 border-zinc-900 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 text-amber-50 flex items-center justify-between border-b-2 border-red-600">
          <div>
            <h3 className="text-xl font-black uppercase tracking-wider font-['Oswald'] text-white">
              Export Meal Plan
            </h3>
            <p className="text-xs text-zinc-400">
              Select CSV, Markdown, or PDF Print format for easy kitchen printing.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex border-b border-zinc-200 bg-zinc-100 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider font-['Oswald'] rounded-t-lg transition-colors cursor-pointer border-t-2 border-x ${
              activeTab === 'pdf'
                ? 'bg-white border-zinc-300 text-red-600 shadow-xs'
                : 'bg-zinc-200/60 border-transparent text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>PDF Print Format</span>
          </button>

          <button
            onClick={() => setActiveTab('markdown')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider font-['Oswald'] rounded-t-lg transition-colors cursor-pointer border-t-2 border-x ${
              activeTab === 'markdown'
                ? 'bg-white border-zinc-300 text-red-600 shadow-xs'
                : 'bg-zinc-200/60 border-transparent text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Markdown (.md)</span>
          </button>

          <button
            onClick={() => setActiveTab('csv')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider font-['Oswald'] rounded-t-lg transition-colors cursor-pointer border-t-2 border-x ${
              activeTab === 'csv'
                ? 'bg-white border-zinc-300 text-red-600 shadow-xs'
                : 'bg-zinc-200/60 border-transparent text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Spreadsheet (.csv)</span>
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* 1. PDF / Easy Print View */}
          {activeTab === 'pdf' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-amber-50 border border-amber-300 rounded-lg">
                <div className="text-xs text-amber-950">
                  <span className="font-bold text-sm block font-['Oswald'] uppercase text-amber-900">
                    🖨️ Easy Kitchen Printing / Save as PDF:
                  </span>
                  Click "Print / Save PDF" below to open your browser’s print dialog. Choose 
                  <strong> "Save as PDF"</strong> to download a crisp PDF, or send directly to your printer!
                </div>
                <button
                  onClick={triggerPrintPlan}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded font-['Oswald'] font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>

              {/* Live Print Preview Sheet */}
              <div 
                id="printable-kitchen-sheet" 
                className="bg-white border-2 border-zinc-900 p-6 rounded-lg text-xs space-y-5 shadow-sm print-container"
              >
                {/* 80s Diner Print Letterhead */}
                <div className="border-b-2 border-zinc-900 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight font-['Oswald'] text-zinc-950">
                      EL GORDO Y EL FLACO
                    </h2>
                    <span className="text-[11px] font-mono text-zinc-600 uppercase block">
                      Fast Food Diner Kitchen Dispatch · Weekly Meal Plan (2 Persons)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-['Oswald'] text-red-700 block uppercase">
                      {plan.weekName}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Mon — Sun · Lunch & Dinner
                    </span>
                  </div>
                </div>

                {/* Print Meal Roster Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-zinc-400 text-left text-xs">
                    <thead>
                      <tr className="bg-zinc-100 border-b border-zinc-400 font-['Oswald'] text-zinc-800 uppercase text-[11px]">
                        <th className="p-2 border-r border-zinc-300 w-28">Day</th>
                        <th className="p-2 border-r border-zinc-300">☀️ Lunch (Serves 2)</th>
                        <th className="p-2">🌙 Dinner (Serves 2)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-300">
                      {DAYS_OF_WEEK.map((day) => {
                        const dp = plan.days[day];
                        if (!dp) return null;
                        return (
                          <tr key={day} className="hover:bg-amber-50/30">
                            <td className="p-2.5 font-bold font-['Oswald'] uppercase border-r border-zinc-300 text-zinc-900 align-top">
                              {day}
                              <span className="block text-[10px] font-normal font-mono text-zinc-500">
                                {dp.dateLabel}
                              </span>
                            </td>
                            <td className="p-2.5 border-r border-zinc-300 align-top">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-bold text-zinc-900">{dp.lunch.title}</span>
                                {dp.lunch.isLeftover && (
                                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 bg-teal-100 text-teal-800 rounded font-mono">
                                    Leftover Reheat
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-zinc-500 font-mono">
                                {dp.lunch.isLeftover 
                                  ? '3m reheat · 0m active cooking' 
                                  : `${dp.lunch.prepTime + dp.lunch.cookTime}m prep · ~${dp.lunch.calorieEstimate || 500} kcal`}
                              </span>
                              <p className="text-[11px] text-zinc-600 mt-1 italic">
                                <strong>Gordo:</strong> {dp.lunch.gordoPortionNotes || 'Hearty portion'} | <strong>Flaco:</strong> {dp.lunch.flacoPortionNotes || 'Lean side'}
                              </p>
                            </td>
                            <td className="p-2.5 align-top">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-bold text-zinc-900">{dp.dinner.title}</span>
                                {dp.dinner.isBatchCook && (
                                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-mono">
                                    Double Batch (4 Servings)
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-zinc-500 font-mono">
                                {dp.dinner.prepTime + dp.dinner.cookTime}m prep · ~${dp.dinner.calorieEstimate || 600} kcal
                              </span>
                              <p className="text-[11px] text-zinc-600 mt-1 italic">
                                <strong>Gordo:</strong> {dp.dinner.gordoPortionNotes || 'Hearty portion'} | <strong>Flaco:</strong> {dp.dinner.flacoPortionNotes || 'Lean side'}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-zinc-300 pt-3 text-[10px] text-zinc-500 font-mono flex items-center justify-between">
                  <span>Prepared by El Gordo Y El Flaco Meal Planner</span>
                  <span>Week starting Monday</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Markdown View */}
          {activeTab === 'markdown' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-zinc-100 rounded-lg">
                <div className="text-xs text-zinc-700">
                  <span className="font-bold block font-['Oswald'] uppercase text-zinc-900">
                    Clean Markdown with Checklist & Grocery Breakdown
                  </span>
                  Ready to paste into Notion, Obsidian, GitHub or print via markdown viewers.
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyMarkdown}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-['Oswald'] text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMd ? 'Copied!' : 'Copy Markdown'}</span>
                  </button>

                  <button
                    onClick={() => exportToMarkdown(plan, pantryItems)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-['Oswald'] text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .md</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-zinc-950 text-amber-100 rounded-lg text-[11px] font-mono overflow-x-auto max-h-96 leading-relaxed border border-zinc-800 whitespace-pre-wrap">
                {markdownContent}
              </pre>
            </div>
          )}

          {/* 3. CSV View */}
          {activeTab === 'csv' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-100 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-zinc-700">
                  <span className="font-bold block font-['Oswald'] uppercase text-zinc-900">
                    RFC 4180 Spreadsheet Export
                  </span>
                  Includes columns for Day, Date, Meal Type, Dish, Servings, Prep Time, Cook Time, Calories, Ingredients and Notes.
                </div>
                <button
                  onClick={() => exportToCSV(plan)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded font-['Oswald'] font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .CSV Spreadsheet</span>
                </button>
              </div>

              <div className="border border-zinc-300 rounded-lg overflow-x-auto bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-100 border-b border-zinc-300 font-['Oswald'] text-zinc-800 text-[11px] uppercase">
                      <th className="p-2 border-r border-zinc-200">Day</th>
                      <th className="p-2 border-r border-zinc-200">Meal</th>
                      <th className="p-2 border-r border-zinc-200">Dish Title</th>
                      <th className="p-2 border-r border-zinc-200">Prep / Cook</th>
                      <th className="p-2">Est. Calories</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-700">
                    {DAYS_OF_WEEK.map((day) => {
                      const dp = plan.days[day];
                      if (!dp) return null;
                      return (
                        <React.Fragment key={day}>
                          <tr className="hover:bg-zinc-50">
                            <td className="p-2 font-semibold border-r border-zinc-200">{day}</td>
                            <td className="p-2 border-r border-zinc-200 font-mono text-amber-700">Lunch</td>
                            <td className="p-2 border-r border-zinc-200">{dp.lunch.title}</td>
                            <td className="p-2 border-r border-zinc-200 font-mono">{dp.lunch.prepTime}m / {dp.lunch.cookTime}m</td>
                            <td className="p-2 font-mono">{dp.lunch.calorieEstimate || 500} kcal</td>
                          </tr>
                          <tr className="hover:bg-zinc-50">
                            <td className="p-2 font-semibold border-r border-zinc-200">{day}</td>
                            <td className="p-2 border-r border-zinc-200 font-mono text-red-700">Dinner</td>
                            <td className="p-2 border-r border-zinc-200">{dp.dinner.title}</td>
                            <td className="p-2 border-r border-zinc-200 font-mono">{dp.dinner.prepTime}m / {dp.dinner.cookTime}m</td>
                            <td className="p-2 font-mono">{dp.dinner.calorieEstimate || 600} kcal</td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
