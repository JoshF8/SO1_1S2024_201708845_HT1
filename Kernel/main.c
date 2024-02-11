#include <linux/module.h>       // Needed by all modules
#include <linux/kernel.h>       // Needed for KERN_INFO
#include <linux/timer.h>
#include <linux/mm.h>
#include <linux/sysinfo.h>

//Variable para saber cada cuanto se va a ejecutar en ms
static int time = 500;

//struct de timer
static struct timer_list myTimer;



module_param(time, int, S_IRUGO);
MODULE_PARM_DESC(time, "Tiempo en el que se ejecutara en ms");

//funcion callback del timer
void timerCallback(struct timer_list *timer){
    //printk(KERN_INFO "Ciclo del timer.\n");
    //obtener la memoria
    struct sysinfo memInfo;
    si_meminfo(&memInfo);
    //obtener la ram total y luego la usada
    unsigned long totalRam = memInfo.totalram * (memInfo.mem_unit >> 10);
    unsigned long freeRam = memInfo.freeram * (memInfo.mem_unit >> 10);
    
    
    //imprimir porcentaje de ram libre
    printk(KERN_INFO "RAM Total: %lu, RAM Libre: %lu\n", totalRam, freeRam);

    //Recrear el timer para el siguiente ciclo
    mod_timer(timer, jiffies + msecs_to_jiffies(time));
}

//Se ejecutara en el momento que se inicie el modulo
int init_module(void) {
    printk(KERN_INFO "Iniciar modulo\n");
    
    pr_info("El tiempo recibido fue %d\n", time);

    //Inicializar la lista de timers
    timer_setup(&myTimer, timerCallback, 0);

    //Inicia el primer ciclo
    mod_timer(&myTimer, jiffies + msecs_to_jiffies(time));

    // Si no se devuelve 0 es porque dio error
    return 0;
}

//Se ejecutara en el momento que se elimine le modulo
void cleanup_module(void) {
    del_timer(&myTimer);
    printk(KERN_INFO "Eliminar modulo\n");

}


//para firmarlo
MODULE_LICENSE("GPL");