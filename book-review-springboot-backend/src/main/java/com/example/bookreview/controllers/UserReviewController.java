package com.example.bookreview.controllers;


import com.example.bookreview.models.UserBook;
import com.example.bookreview.models.UserReview;
import com.example.bookreview.services.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/userreviews")
public class UserReviewController {
    @Autowired
    UserReviewService userReviewService;

    @PostMapping("/add")
    public ResponseEntity<UserReview> addUserReview(@RequestBody Map<String, Object> userBookMap){
        Integer userBookId = (Integer) userBookMap.get("userBookId");
        String bookTitle = (String) userBookMap.get("bookTitle");
        Integer rating = (Integer) userBookMap.get("rating");
        String review = (String) userBookMap.get("review");
        UserReview userReview = userReviewService.addReview(userBookId , bookTitle, rating, review);
        return new ResponseEntity<>(userReview, HttpStatus.OK);

    }

    @GetMapping("")
    public ResponseEntity<List<UserReview>> getAllUserReviews(HttpServletRequest request){
        int userId = (Integer) request.getAttribute("userId");
        List<UserReview> userReviews = userReviewService.fetchUserReviews(userId);
        return new ResponseEntity<>(userReviews, HttpStatus.OK);
    }

    @GetMapping("/{userBookId}")
    public ResponseEntity<UserReview> getReviewByBookId(HttpServletRequest request, @PathVariable("userBookId") Integer userBookId){
        int userId = (Integer) request.getAttribute("userId");
        UserReview userReview = userReviewService.fetchReviewByBookId(userId, userBookId);
        return new ResponseEntity<>(userReview, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<UserReview> updateUserReview(@RequestBody UserReview userReview){
        Integer userReviewId = userReview.getUserReviewId();
        Integer rating = userReview.getRating();
        String review = userReview.getReview();
        userReviewService.updateReview(userReviewId, rating, review);
        return new ResponseEntity<>(userReview, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userReviewId}")
    public ResponseEntity<Map<String,Boolean>> deleteUserReview(@PathVariable("userReviewId") Integer userReviewId){
        userReviewService.deleteReview(userReviewId);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success",true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
