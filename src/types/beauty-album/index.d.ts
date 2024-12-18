
export interface BeautyAlbum {
  id:string;
  rank: number;       
  iconUrl: string;     
  presetImageUrl: string;  
  title: string;       
  classIconUrl: string; 
  images: BeautyAlbumImageType[];
  stats: {
    likes: number;     
    downloads: number;  
    views: number; 
  };
  category: string;
  createdAt: string;
  creator: string;
}

export interface BeautyAlbumTimeRange {
  id: number;
  range: string;
}

export interface BeautyAlbumCategory {
  id: number;
  category: string;
}

export interface BeautyAlbumSort {
  id: number;
  sort: string;
}
export interface BeautyAlbumImageType {
  id: string;
  imageUrl: string;
  title: string;
}

export interface BeautyAlbumStats {
  downloads: number;
  views: number;
  likes: number;
}


export interface BeautyAlbumType {
  id: string;
  title: string;
  presetImageUrl: string;
  iconUrl: string;
  classIconUrl: string;
  stats: BeautyAlbumStats;
  images: BeautyAlbumImageType[];
  downloadUrl?: string;
  createdAt: string; 
  creator: string; 
}

