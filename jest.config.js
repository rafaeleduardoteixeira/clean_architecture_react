module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!**/*d.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass|jpg|jpeg|png|gif|webp|svg|jp?g|png|svg|gif|raw|webp|mpg|mp4|mp3|avi|ogv|ogg|wmv|amv|webm)$':
      'identity-obj-proxy',
    '@/(.*)': '<rootDir>/src/$1',
  },
}
