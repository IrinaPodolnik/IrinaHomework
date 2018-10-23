package com.irina.homework.repository;

import com.irina.homework.domain.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Person entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {

    @Query(nativeQuery = true ,
        value = "SELECT count(*) as count_per_manager from EMPLOYEE e join EMPLOYEE m on m.id = e.MANAGER_ID group by m.ID ")
    int[] standardDeviation();


}
