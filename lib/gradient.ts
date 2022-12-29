import { getSeededRandomIntInRange } from 'lib/rng'

export default ({ seed }) => {
    const interpretations = ['bg-gradient-to-b', 'bg-gradient-to-r']
    const gradients = [
        'from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]',
        'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
        'from-[#D8B4FE] to-[#818CF8]',
        'from-pink-300 via-purple-300 to-indigo-400',
        'from-pink-500 via-red-500 to-yellow-500',
        'from-sky-400 via-rose-400 to-lime-400',
        'from-pink-300 via-purple-300 to-indigo-400',
        'from-indigo-200 via-red-200 to-yellow-100',
        'from-yellow-400 via-gray-50 to-teal-300',
    ]

    return (
        interpretations[
            getSeededRandomIntInRange(seed, 0, interpretations.length)
        ] +
        ' ' +
        gradients[getSeededRandomIntInRange(seed, 0, gradients.length)]
    )
}
