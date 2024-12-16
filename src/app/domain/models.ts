

export interface User {
  name?: string;
  image?: string;
}

export interface customer {
  id?: number;
  creator?:User;
  invoice?:number;
  customer?: User;
  amount?: number;
  status?: string;
}


export interface RevenueStats{
  totalRevenue?: number;
  totalSales?: number;
  mostSellingCategory?: string;
  totalRefunds?: number;
  averageRevenue?: number;
  monthlyRevenueGrowth?: number;
}

export interface AdvanceUser {
  id?: number;
  name?: string;
  email?: string;
  contact?: string;
  status?: string;
}
export interface UserList {
  users: AdvanceUser[];
  total2?: number;
  activeUsers?: number;
  deactivatedUsers?: number;
}


export interface model {
  id?: number;
  title?: string;
  image?: string;
  format?: string;
  price?: number;
  review?: number;
}

export interface modelAdvanced{
    id?: number;
    title?: string;
    description?: string;
    modelUrl?: string;
    image1Url?: string;
    image2Url?: string;
    image3Url?: string;
    tags?: string[];
    downloadType?: string;
    license?: string;
    format?: string;
    price?: number;
    downloads?: number;
    likesCount?: number;
    createdAt?: string;
    review?: number;
}



export interface modelResponse {
  data: modelAdvanced[];
}

interface revenue {categoryName:string, totalRevenue:string}
export interface Statistics {
  totalModels?: number;
  totalUsers?: number;
  totalRevenue?: string;
  totalPurchases?: number;
  totalLikes?: string;
  totalDownloads?: string;
  mostPopularModel?: modelAdvanced;
  lastMonthRevenue: revenue[];
  lastWeekRevenue?: any[];
  newModelsLastWeek?: number;
  newUsersLastWeek?: number;
  moderatorsCount?: number;
  sellersCount?: number;
  pendingRequests?: number;
  totalCategories?: number;
  totalBuyers?: number;
  improvement?: {
    models: number,
    users: number,
    revenue: number,
    sellers: number,
    pendingRequests: number,
    buyers: number
  }

}

// export interface advannce{
//   totalModels?: number;
//   totalUsers?: number;
//   totalRevenue?: number;
//   totalPurchases?: number;
//   totalLikes?: number;
//   totalDownloads?: number;
//   mostPopularModel?: model;
//   lastMonthRevenue?: number;
//   lastWeekRevenue?: number;
//   newModelsLastWeek?: number;
//   newUsersLastWeek?: number;
//   moderatorsCount?: number;
//   sellersCount?: number;
//   pendingRequests?: number;
//   totalCategories?: number;
//   totalBuyers?: number;
//   improvement?: {
//     models: number,
//     users: number,
//     revenue: number,
//     sellers: number,
//     pendingRequests: number,
//     buyers: number
//   }
// }

export interface model2 {
  id?: number;
  user?: User;
  name?: string;
  image?: string;
  category?: string;
  price?: number;
  reviews?: number;
}

export interface error {
  message?: string;
  statusCode?: number;
}
export interface moderatorContributions{
  firstName: string;
  count: number;
}

export interface actions{
  date: string;
  count: number;
}

export interface ModeratorStats{
  totalReviewRequests: number;
  totalReviewRequestsLastWeek: number;
  totalResolvedReviewRequests: number;
  totalRejectedReviewRequests: number;
  totalApprovedLastWeek: number;
  totalRejectedLastWeek: number;
  improveofreject: number;
  improveofapprove: number;
  resolvedCountsLast7Days: actions[];
  userContributions: moderatorContributions[];
}

export interface ModelOwner {
  id: number;
  displayName: string;
  biography: string;
  profilePicture: string;
  personalWebsite: string;
  twitterUsername: string;
  facebookUsername: string;
  linkedInUsername: string;
  skills: string[];
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
  bankName: string;
  accountNumber: string;
  branch: string;
  accountName: string;
  accountBalance: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface ModelFile {
  id: number;
  fileName: string;
  parameters: any;
  valid: boolean;
}

export interface Model {
  id: number;
  title: string;
  description: string;
  modelUrl: string;
  image1Url: string;
  image2Url: string;
  image3Url: string;
  tags: string[];
  downloadType: string;
  license: string;
  format: string;
  price: number;
  downloads: number;
  likesCount: number;
  createdAt: string;
  review: number;
  modelOwner: ModelOwner;
  category: Category;
  model: ModelFile;
}

export interface ModelDetails {
  model: Model;
  isBought: boolean;
  isLiked: boolean;
  reviews: any[]; // Define a more specific review structure if needed
  amIreviewed: boolean;
}


export interface CartItem {
  modelId: number;
  titile: string;
  price: number;
  userName: string;
  imageUrl: string;
}

export interface AISearchResponse {
  frequency: number;
  modelID: number;
  score: number;
  model?: modelAdvanced;
}


export interface Purchases {
  purchasedAt: string;
  model: modelAdvanced;

}
export interface LikedModels {
  id: number;
  model: modelAdvanced;
}

export interface UserRole{
  id: number;
  firstName: string;
  lastName: string;
  roles: string[];
}
