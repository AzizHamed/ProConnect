import { emptySplitApi as api } from "./EmptyApi";
export const addTagTypes = [
  "Users",
  "Jobs",
  "Services",
  "Roles",
  "Properties",
  "Professions",
  "JobOffers",
  "searches",
  "test-controller",
  "articles",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      rateUser: build.mutation<RateUserApiResponse, RateUserApiArg>({
        query: (queryArg) => ({
          url: `/users/RateUser`,
          method: "PUT",
          params: { userId: queryArg.userId, rating: queryArg.rating },
        }),
        invalidatesTags: ["Users"],
      }),
      unlikePost: build.mutation<UnlikePostApiResponse, UnlikePostApiArg>({
        query: (queryArg) => ({
          url: `/jobs/unlike`,
          method: "PUT",
          params: { jobId: queryArg.jobId, userId: queryArg.userId },
        }),
        invalidatesTags: ["Jobs"],
      }),
      likePost: build.mutation<LikePostApiResponse, LikePostApiArg>({
        query: (queryArg) => ({
          url: `/jobs/like`,
          method: "PUT",
          params: { jobId: queryArg.jobId, userId: queryArg.userId },
        }),
        invalidatesTags: ["Jobs"],
      }),
      commentOnPost: build.mutation<
        CommentOnPostApiResponse,
        CommentOnPostApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/comment`,
          method: "PUT",
          body: queryArg.comment,
        }),
        invalidatesTags: ["Jobs"],
      }),
      updateProfile: build.mutation<
        UpdateProfileApiResponse,
        UpdateProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/users/update-profile`,
          method: "POST",
          body: queryArg.updateProfileRequest,
        }),
        invalidatesTags: ["Users"],
      }),
      updateProfessions: build.mutation<
        UpdateProfessionsApiResponse,
        UpdateProfessionsApiArg
      >({
        query: (queryArg) => ({
          url: `/users/update-professions`,
          method: "POST",
          body: queryArg.updateProfessionsRequest,
        }),
        invalidatesTags: ["Users"],
      }),
      updatePersonalInfo: build.mutation<
        UpdatePersonalInfoApiResponse,
        UpdatePersonalInfoApiArg
      >({
        query: (queryArg) => ({
          url: `/users/update-personal-info`,
          method: "POST",
          body: queryArg.updatePersonalInfoRequest,
        }),
        invalidatesTags: ["Users"],
      }),
      createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
        query: (queryArg) => ({
          url: `/users/create`,
          method: "POST",
          body: queryArg.user,
        }),
        invalidatesTags: ["Users"],
      }),
      createUsers: build.mutation<CreateUsersApiResponse, CreateUsersApiArg>({
        query: (queryArg) => ({
          url: `/users/create-users`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Users"],
      }),
      addRole: build.mutation<AddRoleApiResponse, AddRoleApiArg>({
        query: (queryArg) => ({
          url: `/users/add-role`,
          method: "POST",
          params: { userId: queryArg.userId, roleId: queryArg.roleId },
        }),
        invalidatesTags: ["Users"],
      }),
      createUserServices: build.mutation<
        CreateUserServicesApiResponse,
        CreateUserServicesApiArg
      >({
        query: (queryArg) => ({
          url: `/services/create-user-services`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Services"],
      }),
      createUserService: build.mutation<
        CreateUserServiceApiResponse,
        CreateUserServiceApiArg
      >({
        query: (queryArg) => ({
          url: `/services/create-user-service`,
          method: "POST",
          body: queryArg.userServiceEntity,
        }),
        invalidatesTags: ["Services"],
      }),
      createService: build.mutation<
        CreateServiceApiResponse,
        CreateServiceApiArg
      >({
        query: (queryArg) => ({
          url: `/services/create-service`,
          method: "POST",
          params: {
            serviceName: queryArg.serviceName,
            professionId: queryArg.professionId,
          },
        }),
        invalidatesTags: ["Services"],
      }),
      createRole: build.mutation<CreateRoleApiResponse, CreateRoleApiArg>({
        query: (queryArg) => ({
          url: `/roles/create`,
          method: "POST",
          body: queryArg.role,
        }),
        invalidatesTags: ["Roles"],
      }),
      createProperty: build.mutation<
        CreatePropertyApiResponse,
        CreatePropertyApiArg
      >({
        query: (queryArg) => ({
          url: `/properties/create-property`,
          method: "POST",
          body: queryArg.property,
        }),
        invalidatesTags: ["Properties"],
      }),
      createProfession: build.mutation<
        CreateProfessionApiResponse,
        CreateProfessionApiArg
      >({
        query: (queryArg) => ({
          url: `/professions/create`,
          method: "POST",
          params: {
            name: queryArg.name,
            description: queryArg.description,
            iconUrl: queryArg.iconUrl,
          },
        }),
        invalidatesTags: ["Professions"],
      }),
      postJobs: build.mutation<PostJobsApiResponse, PostJobsApiArg>({
        query: (queryArg) => ({
          url: `/jobs/post`,
          method: "POST",
          body: queryArg.createJobRequest,
        }),
        invalidatesTags: ["Jobs"],
      }),
      postJobOffer: build.mutation<PostJobOfferApiResponse, PostJobOfferApiArg>(
        {
          query: (queryArg) => ({
            url: `/jobOffers/PostOffer`,
            method: "POST",
            body: queryArg.jobOffer,
          }),
          invalidatesTags: ["JobOffers"],
        }
      ),
      getUsersByEmail: build.query<
        GetUsersByEmailApiResponse,
        GetUsersByEmailApiArg
      >({
        query: (queryArg) => ({
          url: `/users/usersByEmails`,
          params: { emails: queryArg.emails },
        }),
        providesTags: ["Users"],
      }),
      getAllUsersNumber: build.query<
        GetAllUsersNumberApiResponse,
        GetAllUsersNumberApiArg
      >({
        query: () => ({ url: `/users/users-num` }),
        providesTags: ["Users"],
      }),
      getUser: build.query<GetUserApiResponse, GetUserApiArg>({
        query: (queryArg) => ({
          url: `/users/get`,
          params: { userId: queryArg.userId },
        }),
        providesTags: ["Users"],
      }),
      getUserProfessions: build.query<
        GetUserProfessionsApiResponse,
        GetUserProfessionsApiArg
      >({
        query: (queryArg) => ({
          url: `/users/get-user-professions`,
          params: { userId: queryArg.userId },
        }),
        providesTags: ["Users"],
      }),
      getAllUsers: build.query<GetAllUsersApiResponse, GetAllUsersApiArg>({
        query: () => ({ url: `/users/get-all` }),
        providesTags: ["Users"],
      }),
      userExists: build.query<UserExistsApiResponse, UserExistsApiArg>({
        query: (queryArg) => ({
          url: `/users/exists`,
          params: { userId: queryArg.userId },
        }),
        providesTags: ["Users"],
      }),
      findUserByProfession: build.query<
        FindUserByProfessionApiResponse,
        FindUserByProfessionApiArg
      >({
        query: (queryArg) => ({
          url: `/users/UserByProfession`,
          params: {
            professionName: queryArg.professionName,
            workAreas: queryArg.workAreas,
          },
        }),
        providesTags: ["Users"],
      }),
      getAllUsersByWorkArea: build.query<
        GetAllUsersByWorkAreaApiResponse,
        GetAllUsersByWorkAreaApiArg
      >({
        query: (queryArg) => ({
          url: `/users/FindByWorkArea`,
          params: { workAreas: queryArg.workAreas },
        }),
        providesTags: ["Users"],
      }),
      getSearchesNumbers: build.query<
        GetSearchesNumbersApiResponse,
        GetSearchesNumbersApiArg
      >({
        query: () => ({ url: `/searches/search` }),
        providesTags: ["searches"],
      }),
      getUserRoles: build.query<GetUserRolesApiResponse, GetUserRolesApiArg>({
        query: () => ({ url: `/roles/get-roles` }),
        providesTags: ["Roles"],
      }),
      getAllRoles: build.query<GetAllRolesApiResponse, GetAllRolesApiArg>({
        query: () => ({ url: `/roles/get-all` }),
        providesTags: ["Roles"],
      }),
      getProperties: build.query<GetPropertiesApiResponse, GetPropertiesApiArg>(
        {
          query: () => ({ url: `/properties/get-properties` }),
          providesTags: ["Properties"],
        }
      ),
      getLocations: build.query<GetLocationsApiResponse, GetLocationsApiArg>({
        query: () => ({ url: `/properties/get-locations` }),
        providesTags: ["Properties"],
      }),
      getProfession: build.query<GetProfessionApiResponse, GetProfessionApiArg>(
        {
          query: () => ({ url: `/professions/get` }),
          providesTags: ["Professions"],
        }
      ),
      getAllProfessions: build.query<
        GetAllProfessionsApiResponse,
        GetAllProfessionsApiArg
      >({
        query: () => ({ url: `/professions/get-all` }),
        providesTags: ["Professions"],
      }),
      getUserJobs: build.query<GetUserJobsApiResponse, GetUserJobsApiArg>({
        query: () => ({ url: `/jobs/get-user-jobs` }),
        providesTags: ["Jobs"],
      }),
      getUserJobsById: build.query<
        GetUserJobsByIdApiResponse,
        GetUserJobsByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/get-user-jobs-id`,
          params: { userId: queryArg.userId },
        }),
        providesTags: ["Jobs"],
      }),
      getJobs: build.query<GetJobsApiResponse, GetJobsApiArg>({
        query: (queryArg) => ({
          url: `/jobs/get-job-page`,
          params: {
            jobPage: queryArg.jobPage,
            jobSearchCriteria: queryArg.jobSearchCriteria,
          },
        }),
        providesTags: ["Jobs"],
      }),
      getBestOffer: build.query<GetBestOfferApiResponse, GetBestOfferApiArg>({
        query: (queryArg) => ({
          url: `/jobOffers/getBestOffer`,
          params: { job: queryArg.job },
        }),
        providesTags: ["JobOffers"],
      }),
      init: build.query<InitApiResponse, InitApiArg>({
        query: () => ({ url: `/init` }),
        providesTags: ["test-controller"],
      }),
      getAllArticles: build.query<
        GetAllArticlesApiResponse,
        GetAllArticlesApiArg
      >({
        query: () => ({ url: `/articles/getAllArticles` }),
        providesTags: ["articles"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type RateUserApiResponse = unknown;
export type RateUserApiArg = {
  userId: string;
  rating: number;
};
export type UnlikePostApiResponse = /** status 200 OK */ string;
export type UnlikePostApiArg = {
  jobId: number;
  userId: string;
};
export type LikePostApiResponse = /** status 200 OK */ string;
export type LikePostApiArg = {
  jobId: number;
  userId: string;
};
export type CommentOnPostApiResponse = /** status 200 OK */ Comment;
export type CommentOnPostApiArg = {
  comment: Comment;
};
export type UpdateProfileApiResponse = /** status 200 OK */ User;
export type UpdateProfileApiArg = {
  updateProfileRequest: UpdateProfileRequest;
};
export type UpdateProfessionsApiResponse = /** status 200 OK */ User;
export type UpdateProfessionsApiArg = {
  updateProfessionsRequest: UpdateProfessionsRequest;
};
export type UpdatePersonalInfoApiResponse = /** status 200 OK */ User;
export type UpdatePersonalInfoApiArg = {
  updatePersonalInfoRequest: UpdatePersonalInfoRequest;
};
export type CreateUserApiResponse = /** status 200 OK */ User;
export type CreateUserApiArg = {
  user: User;
};
export type CreateUsersApiResponse = /** status 200 OK */ User[];
export type CreateUsersApiArg = {
  body: User[];
};
export type AddRoleApiResponse = /** status 200 OK */ boolean;
export type AddRoleApiArg = {
  userId: string;
  roleId: number;
};
export type CreateUserServicesApiResponse =
  /** status 200 OK */ UserServiceEntity[];
export type CreateUserServicesApiArg = {
  body: UserServiceEntity[];
};
export type CreateUserServiceApiResponse =
  /** status 200 OK */ UserServiceEntity;
export type CreateUserServiceApiArg = {
  userServiceEntity: UserServiceEntity;
};
export type CreateServiceApiResponse = /** status 200 OK */ Service;
export type CreateServiceApiArg = {
  serviceName: string;
  professionId: number;
};
export type CreateRoleApiResponse = /** status 200 OK */ Role;
export type CreateRoleApiArg = {
  role: Role;
};
export type CreatePropertyApiResponse = /** status 200 OK */ Property;
export type CreatePropertyApiArg = {
  property: Property;
};
export type CreateProfessionApiResponse = /** status 200 OK */ Profession;
export type CreateProfessionApiArg = {
  name: string;
  description: string;
  iconUrl: string;
};
export type PostJobsApiResponse = /** status 200 OK */ Job;
export type PostJobsApiArg = {
  createJobRequest: CreateJobRequest;
};
export type PostJobOfferApiResponse = unknown;
export type PostJobOfferApiArg = {
  jobOffer: JobOffer;
};
export type GetUsersByEmailApiResponse = /** status 200 OK */ User[];
export type GetUsersByEmailApiArg = {
  emails: string[];
};
export type GetAllUsersNumberApiResponse = /** status 200 OK */ number;
export type GetAllUsersNumberApiArg = void;
export type GetUserApiResponse = /** status 200 OK */ User;
export type GetUserApiArg = {
  userId: string;
};
export type GetUserProfessionsApiResponse =
  /** status 200 OK */ UserProfession[];
export type GetUserProfessionsApiArg = {
  userId?: string;
};
export type GetAllUsersApiResponse = /** status 200 OK */ User[];
export type GetAllUsersApiArg = void;
export type UserExistsApiResponse = /** status 200 OK */ boolean;
export type UserExistsApiArg = {
  userId: string;
};
export type FindUserByProfessionApiResponse = /** status 200 OK */ User[];
export type FindUserByProfessionApiArg = {
  professionName: string;
  workAreas: "North" | "Haifa" | "Center" | "BeerShevaa" | "South";
};
export type GetAllUsersByWorkAreaApiResponse = /** status 200 OK */ User[];
export type GetAllUsersByWorkAreaApiArg = {
  workAreas: "North" | "Haifa" | "Center" | "BeerShevaa" | "South";
};
export type GetSearchesNumbersApiResponse = /** status 200 OK */ number;
export type GetSearchesNumbersApiArg = void;
export type GetUserRolesApiResponse = /** status 200 OK */ Role[];
export type GetUserRolesApiArg = void;
export type GetAllRolesApiResponse = /** status 200 OK */ Role[];
export type GetAllRolesApiArg = void;
export type GetPropertiesApiResponse = /** status 200 OK */ Property[];
export type GetPropertiesApiArg = void;
export type GetLocationsApiResponse = /** status 200 OK */ Location[];
export type GetLocationsApiArg = void;
export type GetProfessionApiResponse = /** status 200 OK */ Profession[];
export type GetProfessionApiArg = void;
export type GetAllProfessionsApiResponse = /** status 200 OK */ Profession[];
export type GetAllProfessionsApiArg = void;
export type GetUserJobsApiResponse = /** status 200 OK */ Job[];
export type GetUserJobsApiArg = void;
export type GetUserJobsByIdApiResponse = /** status 200 OK */ Job[];
export type GetUserJobsByIdApiArg = {
  userId: string;
};
export type GetJobsApiResponse = /** status 200 OK */ PageJob;
export type GetJobsApiArg = {
  jobPage: JobPage;
  jobSearchCriteria: JobSearchCriteria;
};
export type GetBestOfferApiResponse = /** status 200 OK */ JobOffer;
export type GetBestOfferApiArg = {
  job: Job;
};
export type InitApiResponse = unknown;
export type InitApiArg = void;
export type GetAllArticlesApiResponse = /** status 200 OK */ Article[];
export type GetAllArticlesApiArg = void;
export type Name = {
  firstName?: string;
  lastName?: string;
};
export type Role = {
  id?: number;
  name: string;
  code: string;
};
export type Review = {
  id?: number;
  score: number;
  reviewText: string;
  reviewer: User;
  reviewedUser: User;
  roleReviewed: Role;
  timestamp?: string;
};
export type Profession = {
  id?: number;
  name: string;
  description: string;
  iconUrl: string;
};
export type UserProfession = {
  profession?: Profession;
  startDate?: string;
  endDate?: string;
  services?: string[];
};
export type User = {
  id?: string;
  name: Name;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  reviewsGiven?: Review[];
  reviewsReceived?: Review[];
  averageRating?: number;
  ratingsCount?: number;
  experience?: number;
  rating?: number;
  numOfRates?: number;
  roles?: Role[];
  profession?: Profession;
  accountStatus?: "SETUP" | "ACTIVE" | "DISABLED";
  photoUrl?: string;
  userProfessions?: UserProfession[];
  workAreas?: "North" | "Haifa" | "Center" | "BeerShevaa" | "South";
};
export type Job = {
  id?: number;
  budget?: number;
  owner?: User;
  datePosted?: string;
  jobStatus?:
    | "Draft"
    | "Published"
    | "In Progress"
    | "Cancelled"
    | "Under Review"
    | "Requires Adjustments"
    | "Finished";
  title: string;
  description: string;
  likedUsers?: User[];
  photos?: string[];
  commentedUsers?: Comment[];
  neededProfessions?: Profession[];
  numberOfReports?: number;
};
export type Comment = {
  commentId?: number;
  date: string;
  job?: Job;
  user?: User;
  numberOfReports?: number;
  jobId?: number;
};
export type UpdatePersonalInfoRequest = {
  name?: Name;
  phoneNumber?: string;
  accountStatus?: "SETUP" | "ACTIVE" | "DISABLED";
  roles?: Role[];
  photoUrl?: string;
};
export type UpdateProfessionsRequest = {
  professions?: UserProfession[];
};
export type UpdateProfileRequest = {
  updatePersonalInfoRequest?: UpdatePersonalInfoRequest;
  updateProfessionsRequest?: UpdateProfessionsRequest;
};
export type Service = {
  id?: number;
  name: string;
  profession?: Profession;
};
export type UserServiceEntity = {
  id?: number;
  description: string;
  service: Service;
  user: User;
  cost?: number;
};
export type Point = {
  x?: number;
  y?: number;
};
export type Location = {
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  point?: Point;
};
export type Property = {
  id?: number;
  name: string;
  owner?: User;
  location?: Location;
};
export type CreateJobRequest = {
  job?: Job;
  profession?: Profession;
};
export type JobOffer = {
  id?: number;
  senderUser: User;
  receiverUser: User;
  bid: number;
  job: Job;
  title?: string;
  description?: string;
  accepted?: boolean;
};
export type SortObject = {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
};
export type PageableObject = {
  offset?: number;
  sort?: SortObject;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  unpaged?: boolean;
};
export type PageJob = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: Job[];
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  empty?: boolean;
};
export type JobPage = {
  pageNumber?: number;
  pageSize?: number;
  sortDirection?: "ASC" | "DESC";
  sortBy?: string;
};
export type JobSearchCriteria = {
  budget?: number;
  jobStatus?:
    | "Draft"
    | "Published"
    | "In Progress"
    | "Cancelled"
    | "Under Review"
    | "Requires Adjustments"
    | "Finished";
  jobDateSearch?: "AllTime" | "Month" | "Week" | "Day" | "Hour";
};
export type Article = {
  id?: number;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  ref?: string;
  imageuri?: string;
};
export const {
  useRateUserMutation,
  useUnlikePostMutation,
  useLikePostMutation,
  useCommentOnPostMutation,
  useUpdateProfileMutation,
  useUpdateProfessionsMutation,
  useUpdatePersonalInfoMutation,
  useCreateUserMutation,
  useCreateUsersMutation,
  useAddRoleMutation,
  useCreateUserServicesMutation,
  useCreateUserServiceMutation,
  useCreateServiceMutation,
  useCreateRoleMutation,
  useCreatePropertyMutation,
  useCreateProfessionMutation,
  usePostJobsMutation,
  usePostJobOfferMutation,
  useGetUsersByEmailQuery,
  useGetAllUsersNumberQuery,
  useGetUserQuery,
  useGetUserProfessionsQuery,
  useGetAllUsersQuery,
  useUserExistsQuery,
  useFindUserByProfessionQuery,
  useGetAllUsersByWorkAreaQuery,
  useGetSearchesNumbersQuery,
  useGetUserRolesQuery,
  useGetAllRolesQuery,
  useGetPropertiesQuery,
  useGetLocationsQuery,
  useGetProfessionQuery,
  useGetAllProfessionsQuery,
  useGetUserJobsQuery,
  useGetUserJobsByIdQuery,
  useGetJobsQuery,
  useGetBestOfferQuery,
  useInitQuery,
  useGetAllArticlesQuery,
} = injectedRtkApi;
