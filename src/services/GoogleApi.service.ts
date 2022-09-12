import axios from "axios";

class GoogleApiService {
  private static GOOGLE_VISION_API_KEY =
    "AIzaSyDlXHnneZE56Jm-PSqxlTO-zp7_1leXOyw";

  private static googleVisionUrl = `https://vision.googleapis.com/v1/images:annotate?key=${GoogleApiService.GOOGLE_VISION_API_KEY}`;

  private static async doGoogleVisionCall(
    base64EncodedFile: string
  ): Promise<GoogleVisionResponse> {
    const dataOptions = {
      requests: [
        {
          features: [
            {
              type: "LABEL_DETECTION",
            },
            {
              type: "IMAGE_PROPERTIES",
            },
          ],
          image: {
            content: base64EncodedFile,
          },
        },
      ],
    };

    /*
           TODO: Do a call to the googleVisionUrl (make use of the dataOptions, which is the data contract Google expects in the POST request)
           The api key is needed to authenticate the call at the google vision api end.
           The axios library is a possible library to use to perform a POST request
         */
    const response = await axios.post<GoogleVisionResponse>(
      this.googleVisionUrl,
      dataOptions
    );
    return response.data;
  }

  public detectLabels(file: File): Promise<GoogleVisionResponse> {
    return this.blobToBase64(file, GoogleApiService.doGoogleVisionCall);
  }

  private blobToBase64(
    blob: any,
    callback: any
  ): Promise<GoogleVisionResponse> {
    return new Promise<GoogleVisionResponse>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        let base64;
        if (typeof dataUrl === "string") {
          base64 = dataUrl.split(",")[1];
        }
        resolve(callback(base64));
      };
      reader.readAsDataURL(blob);
    });
  }
}

export const googleApiService = new GoogleApiService();

export interface LabelAnnotation {
  mid: string;
  description: string;
  score: number;
  topicality: number;
}

export interface Response {
  labelAnnotations: LabelAnnotation[];
  imagePropertiesAnnotation: ImagePropertiesAnnotation;
}

export interface GoogleVisionResponse {
  responses: Response[];
}

export interface Color2 {
  red: number;
  green: number;
  blue: number;
}

export interface Color {
  color: Color2;
  score: number;
  pixelFraction: number;
}

export interface DominantColors {
  colors: Color[];
}

export interface ImagePropertiesAnnotation {
  dominantColors: DominantColors;
}
