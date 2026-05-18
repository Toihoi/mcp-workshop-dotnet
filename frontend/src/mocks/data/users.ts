import { UserDto } from '@/types/api';

export const mockUsers: UserDto[] = [
  { id: 1, loginId: 'chulsu', name: '김철수', email: 'chulsu@example.com', avatarUrl: null, company: 'Internal' },
  { id: 2, loginId: 'younghee', name: '이영희', email: 'younghee@example.com', avatarUrl: null, company: 'Internal' },
  { id: 3, loginId: 'parkpm', name: '박PM', email: 'parkpm@example.com', avatarUrl: null, company: 'Internal' },
  { id: 4, loginId: 'jungdev', name: '정개발', email: 'jungdev@example.com', avatarUrl: null, company: 'Internal' },
  { id: 5, loginId: 'choicon', name: '최컨설', email: 'choicon@example.com', avatarUrl: null, company: 'Internal' },
  { id: 6, loginId: 'hanqa', name: '한QA', email: 'hanqa@example.com', avatarUrl: null, company: 'Internal' },
  { id: 7, loginId: 'partner_a', name: '외주사A', email: 'partner_a@example.com', avatarUrl: null, company: 'Partner' },
  { id: 8, loginId: 'customer_b', name: '고객사B', email: 'customer_b@example.com', avatarUrl: null, company: 'Customer' },
];
