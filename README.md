# VanMovie App
## Demo Link
https://www.youtube.com/watch?v=XWCPdCxFLPs

## Overview

VanMovie App is a user-friendly platform designed for movie enthusiasts offering the latest insights into popular movies in Vancouver. The app boasts a rich database, coupled with interactive features to elevate the user experience.

### Team Members & Contributions

**Loris**:

- 📊 Laid the foundation by providing the framework for the app.
- 🎬 Integrated the TMDB API and the Cineplex API.
- 📍 Incorporated a location functionality to display cinema and user locations.
- 📝 Made the components for user to log in, sign out, and comment inputting/displaying.
- 🔄 Ensured real-time data synchronization with APIs for up-to-date information.

**Zhi Liu**:

- 📸 Integrated the camera functionality to take a picture with camera.
- 🖼️ Incorporated the gallery functionality to select a picture locally.
- 🛡️ Introduced Headers and TabNavigator for screen switching.
- 🎨 Improved the style design of the entire system.
- ⚙️ Optimized app performance to ensure smooth user interactions.

**Ziqi Fo**:

- 📝 Created the presentation slides and project demo.
- 📡 Led the data-fetching process from various APIs.
- 🔔 Incorporated a real-time notification functionality.
- 🔎 Actively involved in bug detection and resolution.
- 💡 Introduced innovative features based on user feedback for continuous improvement.

### Data Model

The VanMovie app's data model encompasses three collections as described below:

#### 1. **uid-email**

**Description**:  
Compilation of personal information of the users

**Attributes**:

- `id`: Unique identifier of the user.
- `email`: Email addresses of the user.

#### 2. **comments**

**Description**:  
Compilation of comments posted by the users

**Attributes**:

- `id`: Unique identifier for the user.
- `cm`: Comments submitted by the user.
- `mv`: Name of the movie linked to the comment.

#### 3. **users**

**Description**:  
Compilation of profile pictures set by the users

**Attributes**:

- `id`: Unique identifier of the user.
- `image`: Identifier of the picture set by the user.

#### **4. Interaction between collections**

- All the three collections are linked via the id of user.
- On the Sign-Up step, a unique id of user is assigned to the email of user.
- The Detail screen displays the details of current movie as well as the comments and their corresponding user emails about it. The movie name and comment content from the comment collection is linked to the email from the uid-user collection via the id of user.
- The profile screen displays the email of the current user and the avatar picture set by the current user from either camera taking or gallery selection. The picture identifier from the user collection is linked to the email from the uid-email collection via the id of user.

## About Iteration3, what do we have so far:

### API Integrations

- 🎬 **TMDB API**: This API provides our app with current and popular movies, enriching the movie database.
- 🌏 **Google Map API**: Integrated to display nearby cinemas to users in real-time.
- 🎥 **Cineplex API**: Another valuable source for our movie and cinema database.

### Features & Progress

- **Homepage**:

  - Display of trending movies ensures users are always updated with the cinema world.
  - Detailed view: Users can click on any movie to dive deeper into its synopsis, runtime, and more.
    ![Vanmovi1](https://github.com/kayan9896/Vanmovi/assets/122495175/a8235203-b17f-4cd6-89f6-d035ecb2351c)

  - Reviews: After viewing the movie details, users can drop their opinions and ratings.
  - 🎲 **Random Movie Recommendation**: A unique button on the homepage surprises users by suggesting a random movie genre.
    ![6048968b61cc9738d677490685fd2fa](https://github.com/kayan9896/Vanmovi/assets/122495175/0efaba97-790c-4762-a685-7c6aaaeea010)

- **Cinemas Page**:

  - 📍 **Cinema Locator**: Utilizing the Google Map API, users can visually locate nearby cinemas.
  - 📜 A neat list of nearby cinemas is also provided for users who prefer a textual view.
    ![Vanmovi2](https://github.com/kayan9896/Vanmovi/assets/122495175/7dcfce75-e0ad-42a8-ae09-159550832fd1)

- **Profile Section (Top Right Corner)**:
  - 🖼️ **User Avatar**: Displayed prominently, users can easily change or update their profile picture.
    ![5dcf83239a77860675f8cf92da62b00](https://github.com/kayan9896/Vanmovi/assets/122495175/aeb6d384-9c5c-4831-a407-86aa61d68c3b)
    - 📷 Camera Integration: Users have the option to take a new photo using the device's camera.
    - 📂 Local Photo Upload: Alternatively, users can choose a photo from their device's local storage for the avatar.
  - 📧 User's registered email is shown for easy reference.
  - 💬 **User Comments**: All the reviews and comments made by the user are neatly organized here. - 🔧 Edit & Delete: Users have the flexibility to edit their avatars or even delete specific comments they've made in the past.
    ![Vanmovi3](https://github.com/kayan9896/Vanmovi/assets/122495175/bcf43593-e0b0-4ac3-9761-4ce5fd696dc2)

---

This README reflects the current status of the VanMovie app, highlighting the features and integrations that make our platform unique and user-centric.
