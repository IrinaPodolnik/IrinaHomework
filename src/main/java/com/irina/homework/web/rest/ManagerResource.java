package com.irina.homework.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.irina.homework.domain.Manager;
import com.irina.homework.repository.ManagerRepository;
import com.irina.homework.service.ManagerService;
import com.irina.homework.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ManagerResource {

    private static final String ENTITY_NAME = "Manager";
    private final ManagerRepository managerRepository;
    private ManagerService managerService;

    public ManagerResource(ManagerRepository managerRepository,
                           ManagerService managerService) {
        this.managerRepository = managerRepository;
        this.managerService = managerService;
    }

    @PostMapping("/managers")
    @Timed
    public ResponseEntity<Manager> createManager(@RequestBody Manager manager) throws URISyntaxException {
        Manager result = managerRepository.save(manager);
        return ResponseEntity.created(new URI("/api/managers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @GetMapping("/managers")
    @Timed
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }


    @PutMapping("/managers/{managerId}/employees/{employeeId}")
    @Timed
    public ResponseEntity<Manager> addEmployeeToManager(@PathVariable("managerId") Long managerId,
                                                        @PathVariable("employeeId") Long emploeeId) throws URISyntaxException {
        managerService.addEmployeeToManager(managerId, emploeeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/managers/{id}")
    @Timed
    public ResponseEntity<Manager> getManager(@PathVariable Long id) {
        Optional<Manager> manager = managerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(manager);
    }

    @GetMapping("/managers/standard-deviation")
    @Timed
    public double calculateStandardDeviation() {
        return managerService.calculateStandardDeviation();
    }


}
