'use client'

import { useState, useRef } from 'react'
import { calculateInvestment, InvestmentInput } from '@/utils/investmentLogic'
import { TrendingUp, DollarSign, Calendar, Percent, Sparkles, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

export default function CompoundInterestCalculator() {
  const [input, setInput] = useState<InvestmentInput>({
    initialDeposit: 5000,
    monthlyContribution: 500,
    years: 25,
    interestRate: 7,
  })

  const [showResults, setShowResults] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const result = calculateInvestment(input)

  const handleCalculate = () => {
    setShowResults(true)
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // Format currency for tooltips
  const formatCurrency = (value: number) => {
    return `${value.toLocaleString('fr-CA')} $`
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-blue-600" />
          Vos Paramètres d'Investissement
        </h3>
        
        <div className="space-y-6">
          {/* Initial Deposit */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Montant initial
              </label>
              <span className="text-lg font-bold text-blue-600">
                {input.initialDeposit.toLocaleString('fr-CA')} $
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={input.initialDeposit}
              onChange={(e) => setInput({ ...input, initialDeposit: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 $</span>
              <span>50 000 $</span>
            </div>
          </div>

          {/* Monthly Contribution */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Contribution mensuelle
              </label>
              <span className="text-lg font-bold text-blue-600">
                {input.monthlyContribution.toLocaleString('fr-CA')} $
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={input.monthlyContribution}
              onChange={(e) => setInput({ ...input, monthlyContribution: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 $</span>
              <span>2 000 $</span>
            </div>
          </div>

          {/* Years */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Durée de l'investissement
              </label>
              <span className="text-lg font-bold text-blue-600">
                {input.years} ans
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={input.years}
              onChange={(e) => setInput({ ...input, years: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 an</span>
              <span>40 ans</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Taux de rendement annuel
              </label>
              <span className="text-lg font-bold text-blue-600">
                {input.interestRate} %
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={input.interestRate}
              onChange={(e) => setInput({ ...input, interestRate: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1%</span>
              <span>15%</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Le rendement moyen du S&P 500 est d'environ 10% par an sur le long terme
            </p>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-6 h-6" />
            Voir la magie des intérêts composés
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Main "Wow" Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl p-8 border-2 border-blue-200">
            <div className="text-center mb-6">
              <p className="text-xl text-gray-700 mb-4">
                Dans <span className="font-bold text-blue-600">{input.years} ans</span>, vous aurez :
              </p>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-7xl font-bold text-blue-600 mb-4"
              >
                {result.finalTotal.toLocaleString('fr-CA')} $
              </motion.div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Votre argent investi</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {result.totalInvested.toLocaleString('fr-CA')} $
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Intérêts gagnés (gratuits!)</p>
                    <p className="text-3xl font-bold text-green-600">
                      {result.totalInterest.toLocaleString('fr-CA')} $
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insight */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <p className="text-lg font-semibold">
                Les intérêts représentent{' '}
                <span className="text-2xl font-bold">
                  {Math.round((result.totalInterest / result.finalTotal) * 100)}%
                </span>
                {' '}de votre fortune finale!
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              La Croissance de Votre Investissement
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={result.yearlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="year" 
                  label={{ value: 'Années', position: 'insideBottom', offset: -5 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k $`}
                  stroke="#6b7280"
                />
                <Tooltip 
                  formatter={formatCurrency}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  iconType="square"
                />
                <Area 
                  type="monotone" 
                  dataKey="invested" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorInvested)"
                  name="Votre argent"
                />
                <Area 
                  type="monotone" 
                  dataKey="interest" 
                  stackId="1"
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorInterest)"
                  name="Intérêts gagnés"
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-gray-600 mt-4">
              Remarquez comment la partie verte (intérêts) croît de façon exponentielle! 
              C'est la magie des intérêts composés. 🚀
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h4 className="text-2xl font-bold mb-4">Commencez à investir dès aujourd'hui</h4>
            <p className="text-lg mb-6 text-indigo-100">
              Plus tôt vous commencez, plus les intérêts composés travaillent pour vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.wealthsimple.com/fr-ca"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Ouvrir un CELI (Wealthsimple)
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="https://www.questrade.com/self-directed-investing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 border-2 border-white"
              >
                Ouvrir un compte (Questrade)
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-indigo-200 mt-4">
              Ces liens sont fournis à titre informatif. Faites vos propres recherches avant d'investir.
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note importante:</strong> Les rendements passés ne garantissent pas les rendements futurs. 
              Ce calculateur est fourni à titre éducatif seulement et ne constitue pas un conseil financier. 
              Consultez un conseiller financier pour des recommandations personnalisées.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
