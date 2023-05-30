package com.example.bookreview.controllers;

import com.example.bookreview.Constants;
import com.example.bookreview.models.User;
import com.example.bookreview.models.UserBook;
import com.example.bookreview.services.UserBookService;
import com.example.bookreview.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/userbooks")
public class UserBookController {

    @Autowired
    UserBookService userBookService;

    //HttpServletRequest request, @RequestBody Map<String, Object> categoryMap
    @PostMapping("/add")
    public ResponseEntity<UserBook> addUserBook(HttpServletRequest request, @RequestBody Map<String, Object> userBookMap){
        Integer userId = (Integer) request.getAttribute("userId");
        String bookTitle = (String) userBookMap.get("booktitle");
        String bookKey = (String) userBookMap.get("bookkey");
        String bookIsbn = (String) userBookMap.get("bookisbn");
        String authorName = (String) userBookMap.get("authorname");
        Integer firstYrPublish = (Integer) userBookMap.get("firstyrpublish");
        UserBook userbook = userBookService.addBook(userId, bookTitle, bookKey, bookIsbn, authorName, firstYrPublish);
        return new ResponseEntity<>(userbook, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<UserBook>> getAllUserBooks(HttpServletRequest request){
        int userId = (Integer) request.getAttribute("userId");
        List<UserBook> userBooks = userBookService.fetchAllUserBooks(userId);
        return new ResponseEntity<>(userBooks, HttpStatus.OK);
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<UserBook> getUserBook(HttpServletRequest request, @PathVariable("isbn") String isbn){
        int userId = (Integer) request.getAttribute("userId");
        UserBook userBook = userBookService.fetchUserBookByIsbn(userId,isbn);
        return new ResponseEntity<>(userBook, HttpStatus.OK);
    }

    @DeleteMapping("delete/{userBookId}")
    public ResponseEntity<Map<String,Boolean>> deleteUserBook(HttpServletRequest request,
                                                              @PathVariable("userBookId") Integer userBookId){
        int userId = (Integer) request.getAttribute("userId");
        userBookService.removeUserBook(userId,userBookId);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success",true);
        return new ResponseEntity<>(map, HttpStatus.OK);

    }

}
